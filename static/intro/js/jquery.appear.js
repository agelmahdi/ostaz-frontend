;(function ($) {
  $.fn.appear = function (fn, options) {
    const settings = $.extend(
      { data: undefined, one: true, accX: 0, accY: 0 },
      options
    )
    return this.each(function () {
      const t = $(this)
      t.appeared = false
      if (!fn) {
        t.trigger('appear', settings.data)
        return
      }
      const w = $(window)
      const check = function () {
        if (!t.is(':visible')) {
          t.appeared = false
          return
        }
        const a = w.scrollLeft()
        const b = w.scrollTop()
        const o = t.offset()
        const x = o.left
        const y = o.top
        const ax = settings.accX
        const ay = settings.accY
        const th = t.height()
        const wh = w.height()
        const tw = t.width()
        const ww = w.width()
        if (
          y + th + ay >= b &&
          y <= b + wh + ay &&
          x + tw + ax >= a &&
          x <= a + ww + ax
        ) {
          if (!t.appeared) { t.trigger('appear', settings.data) }
        } else {
          t.appeared = false
        }
      }
      const modifiedFn = function () {
        t.appeared = true
        if (settings.one) {
          w.unbind('scroll', check)
          const i = $.inArray(check, $.fn.appear.checks)
          if (i >= 0) { $.fn.appear.checks.splice(i, 1) }
        }
        fn.apply(this, arguments)
      }
      if (settings.one) { t.one('appear', settings.data, modifiedFn) } else { t.bind('appear', settings.data, modifiedFn) }
      w.scroll(check)
      $.fn.appear.checks.push(check)
      check()
    })
  }
  $.extend($.fn.appear, {
    checks: [],
    timeout: null,
    checkAll () {
      let length = $.fn.appear.checks.length
      if (length > 0) { while (length--) { $.fn.appear.checks[length]() } }
    },
    run () {
      if ($.fn.appear.timeout) { clearTimeout($.fn.appear.timeout) }
      $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20)
    }
  })
  $.each(
    [
      'append',
      'prepend',
      'after',
      'before',
      'attr',
      'removeAttr',
      'addClass',
      'removeClass',
      'toggleClass',
      'remove',
      'css',
      'show',
      'hide'
    ],
    function (i, n) {
      const old = $.fn[n]
      if (old) {
        $.fn[n] = function () {
          const r = old.apply(this, arguments)
          $.fn.appear.run()
          return r
        }
      }
    }
  )
})(jQuery)
