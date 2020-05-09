<template>
  <div>
    <!-- loading End -->

    <!-- Header -->

    <header id="header-wrap" data-spy="affix" data-offset-top="55">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <nav class="navbar navbar-default">
              <!-- Brand and toggle get grouped for better mobile display -->
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar" />
                  <span class="icon-bar" />
                  <span class="icon-bar" />
                </button>
                <a class="navbar-brand" href="javascript:void(0)">
                  <img src="/intro/images/logo.png" alt="logo">
                </a>
              </div>
              <!-- Collect the nav links, forms, and other content for toggling -->
              <div
                id="bs-example-navbar-collapse-1"
                class="collapse navbar-collapse"
              >
                <ul id="top-menu" class="nav navbar-nav navbar-right">
                  <li class="active">
                    <a href="#iq-home">{{ $t("links.home") }}</a>
                  </li>
                  <li>
                    <a href="#about-us">{{ $t("links.about") }}</a>
                  </li>
                  <li>
                    <a href="#features">{{ $t("links.features") }}</a>
                  </li>
                  <li>
                    <a href="#team">{{ $t("links.team") }}</a>
                  </li>

                  <li>
                    <a href="#contact-us">{{ $t("links.contact") }}</a>
                  </li>
                  <li>
                    <nuxt-link :to="localePath('/login')">
                      {{ $t("links.teacherslogin") }}
                    </nuxt-link>
                  </li>

                  <li v-if="$i18n.locale !== 'en'" @click="changeToEn">
                    <!--                    <NuxtLink v-if="$i18n.locale === 'en'" :to="`/ar` + $route.fullPath" exact>-->
                    <!--                      {{ $t('links.arabic') }}-->
                    <!--                    </NuxtLink>-->
                    <!--                    <NuxtLink v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" exact>-->
                    <!--                      {{ $t('links.english') }}-->
                    <!--                    </NuxtLink>-->
                    <a>{{ $t("links.english") }}</a>
                  </li>
                  <li v-else @click="changeToAr">
                    <a>{{ $t("links.arabic") }}</a>
                  </li>
                </ul>
              </div>
              <!-- /.navbar-collapse -->
            </nav>
          </div>
        </div>
      </div>
    </header>

    <!-- Header End -->

    <!-- Banner -->
    <div
      id="video"
      class="video-bg iq-bg iq-bg-fixed iq-box-shadow iq-over-black-80"
      data-vide-bg="video/01"
      data-vide-options="position: 0% 50%"
      style="width: 100%; height: 100%;"
    >
      <section id="iq-home" class="bannerq-bg">
        <div class="container">
          <div class="row banner-text">
            <div class="col-md-8 col-lg-8 hidden-xs hidden-sm">
              <h1
                class="iq-font-white iq-tw-8"
                data-animation="animated fadeInLeft"
              >
                <small class="iq-font-white iq-tw-6"><b class="iq-font-white">&#9679;</b>
                  {{ $t("intro.fast") }}</small>{{ $t("intro.amazing") }}
              </h1>
            </div>
            <div v-if="isLogin" class="col-md-4 col-lg-4">
              <form class="banner-form">
                <div class="heading-title">
                  <h5 class="title iq-tw-2">
                    {{ $t("intro.login") }}
                  </h5>
                  <div class="divider" />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1" class="text-uppercase">{{
                    $t("intro.email")
                  }}</label>
                  <input
                    id="exampleInputEmail1"
                    v-model="email"
                    type="email"
                    class="form-control"
                    :placeholder="$t('intro.emailaddess')"
                  >
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1" class="text-uppercase">{{
                    $t("intro.password")
                  }}</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="password"
                    type="password"
                    class="form-control"
                    :placeholder="$t('intro.enterpassword')"
                  >
                </div>
                <div class="remember-checkbox iq-pt-10">
                  <input id="one" type="checkbox" name="one">
                  <label class="remember" for="one">{{
                    $t("intro.remeber")
                  }}</label>
                </div>

                <a
                  class="button btn-block text-center iq-mt-30"
                  @click.prevent="login"
                >{{ $t("intro.enter") }}</a>

                <label class="text-center iq-mlr-30 iq-mt-10">
                  {{ $t('intro.noaccount') }} <button class="text-success" @click.prevent="isLogin = false">
                    {{ $t('intro.signup') }}
                  </button>
                </label>
              </form>
            </div>

            <div v-else class="col-md-4 col-lg-4">
              <form class="banner-form">
                <div class="heading-title">
                  <h5 class="title iq-tw-2">
                    {{ $t("intro.register") }}
                  </h5>
                  <div class="divider" />
                </div>
                <div class="form-group">
                  <label for="exampleInputNameْ" class="text-uppercase">{{
                    $t("intro.username")
                  }}</label>
                  <input
                    id="exampleInputNameْ"
                    type="text"
                    class="form-control"
                    :placeholder="$t('intro.entername')"
                  >
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail2" class="text-uppercase">{{
                    $t("intro.email")
                  }}</label>
                  <input
                    id="exampleInputEmail2"
                    type="email"
                    class="form-control"
                    :placeholder="$t('intro.emailaddess')"
                  >
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword2" class="text-uppercase">{{
                    $t("intro.password")
                  }}</label>
                  <input
                    id="exampleInputPassword2"
                    type="password"
                    class="form-control"
                    :placeholder="$t('intro.enterpassword')"
                  >
                </div>
                <div class="form-group">
                  <label for="confirm" class="text-uppercase">{{
                    $t("intro.confirm")
                  }}</label>
                  <input
                    id="confirm"
                    type="password"
                    class="form-control"
                    :placeholder="$t('intro.confirmpassword')"
                  >
                </div>

                <a
                  href="javascript:void(0)"
                  class="button btn-block text-center iq-mt-30"
                >{{ $t("intro.enter") }}</a>
                <label class="text-center iq-mlr-30 iq-mt-10">
                  {{ $t('intro.haveaccount') }} <button class="text-success" @click.prevent="isLogin = !isLogin">
                    {{ $t('intro.signin') }}
                  </button>
                </label>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Banner End -->

    <div class="main-content">
      <!-- About Our App -->

      <section id="about-us" class="overview-block-ptb iq-about-1 grey-bg">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <img
                class="img-responsive center-block wow fadeInLeft"
                data-wow-duration="1s"
                src="/intro/images/01.png"
                alt="#"
              >
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <h2 class="iq-tw-6 iq-mt-40">
                {{ $t("intro.about") }}
              </h2>
              <p>
                {{ $t("intro.aboutdis") }}
              </p>
              <h2 class="iq-tw-6 iq-mt-40">
                {{ $t("intro.mission") }}
              </h2>
              <p>
                {{ $t("intro.missiondis") }}
              </p>

              <h2 class="iq-tw-6 iq-mt-40">
                {{ $t("intro.vision") }}
              </h2>
              <p>
                {{ $t("intro.visiondis") }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Our App END -->

      <!-- Special Features -->

      <section
        id="features"
        class="overview-block-ptb iq-amazing-tab-one white-bg"
      >
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="heading-title">
                <h2 class="title iq-tw-6">
                  {{ $t("sfeatures.title") }}
                </h2>
                <div class="divider" />
                <p>{{ $t("sfeatures.discription") }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <!-- Nav tabs -->
              <ul
                v-if="this.$i18n.locale === 'ar'"
                class="nav nav-tabs"
                role="tablist"
              >
                <li role="presentation" class="active">
                  <a
                    href="#home"
                    aria-controls="home"
                    role="tab"
                    data-toggle="tab"
                  ><span>{{ $t("sfeatures.feature1") }}</span><i aria-hidden="true" class="ion-ios-monitor-outline" /></a>
                </li>
                <li role="presentation">
                  <a
                    href="#profile"
                    aria-controls="profile"
                    role="tab"
                    data-toggle="tab"
                  ><span>{{ $t("sfeatures.feature2") }}</span><i aria-hidden="true" class="ion-ios-settings" /></a>
                </li>
                <li role="presentation">
                  <a
                    href="#messages"
                    aria-controls="messages"
                    role="tab"
                    data-toggle="tab"
                  ><span>{{ $t("sfeatures.feature3") }}</span><i
                    aria-hidden="true"
                    class="ion-social-googleplus-outline"
                  /></a>
                </li>
                <li role="presentation">
                  <a
                    href="#settings"
                    aria-controls="settings"
                    role="tab"
                    data-toggle="tab"
                  ><span>{{ $t("sfeatures.feature4") }}</span><i aria-hidden="true" class="ion-ios-heart-outline" /></a>
                </li>
              </ul>
              <ul v-else class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                  <a
                    href="#home"
                    aria-controls="home"
                    role="tab"
                    data-toggle="tab"
                  ><i
                    aria-hidden="true"
                    class="ion-ios-monitor-outline"
                  /><span>{{ $t("sfeatures.feature1") }}</span></a>
                </li>
                <li role="presentation">
                  <a
                    href="#profile"
                    aria-controls="profile"
                    role="tab"
                    data-toggle="tab"
                  ><i aria-hidden="true" class="ion-ios-settings" /><span>{{
                    $t("sfeatures.feature2")
                  }}</span></a>
                </li>
                <li role="presentation">
                  <a
                    href="#messages"
                    aria-controls="messages"
                    role="tab"
                    data-toggle="tab"
                  ><i
                    aria-hidden="true"
                    class="ion-social-googleplus-outline"
                  /><span>{{ $t("sfeatures.feature3") }}</span></a>
                </li>
                <li role="presentation">
                  <a
                    href="#settings"
                    aria-controls="settings"
                    role="tab"
                    data-toggle="tab"
                  ><i aria-hidden="true" class="ion-ios-heart-outline" /><span>{{ $t("sfeatures.feature4") }}</span></a>
                </li>
              </ul>
              <!-- Tab panes -->
              <div class="tab-content iq-mt-50">
                <div id="home" role="tabpanel" class="tab-pane active">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <img
                        class="img-responsive center-block"
                        src="/intro/images/03.png"
                        alt="#"
                      >
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <h4 class="heading-left iq-tw-6 iq-mt-30">
                        {{ $t("sfeatures.feature1") }}
                      </h4>
                      <p>{{ $t("sfeatures.feature1dis") }}</p>
                    </div>
                  </div>
                </div>
                <div id="profile" role="tabpanel" class="tab-pane">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <h4 class="heading-left iq-tw-6 iq-mt-30">
                        {{ $t("sfeatures.feature2") }}
                      </h4>
                      <p>{{ $t("sfeatures.feature2dis") }}</p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <img
                        class="img-responsive center-block"
                        src="/intro/images/03.png"
                        alt="#"
                      >
                    </div>
                  </div>
                </div>
                <div id="messages" role="tabpanel" class="tab-pane">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <img
                        class="img-responsive center-block"
                        src="/intro/images/03.png"
                        alt="#"
                      >
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <h4 class="heading-left iq-tw-6 iq-mt-30">
                        {{ $t("sfeatures.feature3") }}
                      </h4>
                      <p>{{ $t("sfeatures.feature3dis") }}</p>
                    </div>
                  </div>
                </div>
                <div id="settings" role="tabpanel" class="tab-pane">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <h4 class="heading-left iq-tw-6 iq-mt-30">
                        {{ $t("sfeatures.feature4") }}
                      </h4>
                      <p>{{ $t("sfeatures.feature4dis") }}</p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <img
                        class="img-responsive center-block"
                        src="/intro/images/03.png"
                        alt="#"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Special Features END -->

      <!-- App Screenshots -->

      <!-- App Screenshots END -->

      <!-- Appino Great Feature -->

      <section class="overview-block-ptb grey-bg iq-great-feature">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="heading-title">
                <h2 class="title iq-tw-6">
                  {{ $t("features.title") }}
                </h2>
                <div class="divider" />
                <p>{{ $t("features.discription") }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <v-row
                class="iq-fancy-box-02 iq-mt-100 wow fadeInLeft"
                data-wow-duration="1s"
              >
                <div class="iq-icon green-bg">
                  <i aria-hidden="true" class="ion-ios-checkmark-outline" />
                </div>
                <v-col class="fancy-content">
                  <h5 class="iq-tw-6">
                    {{ $t("features.feature1") }}
                  </h5>
                  <p>{{ $t("features.feature1dis") }}</p>
                </v-col>
              </v-row>
              <v-row
                class="iq-fancy-box-02 iq-mt-60 wow fadeInLeft"
                data-wow-duration="1s"
              >
                <div class="iq-icon green-bg">
                  <i aria-hidden="true" class="ion-ios-color-wand-outline" />
                </div>
                <v-col class="fancy-content">
                  <h5 class="iq-tw-6">
                    {{ $t("features.feature2") }}
                  </h5>
                  <p>{{ $t("features.feature2dis") }}</p>
                </v-col>
              </v-row>
              <v-row
                class="iq-fancy-box-02 iq-mt-60 wow fadeInLeft"
                data-wow-duration="1s"
              >
                <div class="iq-icon green-bg">
                  <i aria-hidden="true" class="ion-ios-copy-outline" />
                </div>
                <v-col class="fancy-content">
                  <h5 class="iq-tw-6">
                    {{ $t("features.feature3") }}
                  </h5>
                  <p>{{ $t("features.feature3dis") }}</p>
                </v-col>
              </v-row>
            </div>
            <div class="col-md-4 text-center hidden-sm hidden-xs">
              <img
                src="/intro/images/banner/01.png"
                class="img-responsive center-block wow fadeInUp"
                data-wow-duration="1s"
                alt="#"
              >
            </div>
            <div class="col-md-4">
              <v-row
                class="iq-fancy-box-02 iq-mt-100 wow fadeInRight"
                data-wow-duration="1s"
              >
                <div class="iq-icon green-bg">
                  <i aria-hidden="true" class="ion-ios-heart-outline" />
                </div>
                <v-col class="fancy-content">
                  <h5 class="iq-tw-6">
                    {{ $t("features.feature4") }}
                  </h5>
                  <p>{{ $t("features.feature4dis") }}</p>
                </v-col>
              </v-row>
              <v-row
                class="iq-fancy-box-02 iq-mt-60 wow fadeInRight"
                data-wow-duration="1s"
              >
                <div class="iq-icon green-bg">
                  <i aria-hidden="true" class="ion-ios-monitor-outline" />
                </div>
                <v-col class="fancy-content">
                  <h5 class="iq-tw-6">
                    {{ $t("features.feature5") }}
                  </h5>
                  <p>{{ $t("features.feature5dis") }}</p>
                </v-col>
              </v-row>

              <v-row
                class="iq-fancy-box-02 iq-mt-60 wow fadeInRight"
                data-wow-duration="1s"
              >
                <div class="iq-icon green-bg">
                  <i aria-hidden="true" class="ion-ios-plus-outline" />
                </div>
                <v-col class="fancy-content">
                  <h5 class="iq-tw-6">
                    {{ $t("features.feature6") }}
                  </h5>
                  <p>{{ $t("features.feature6dis") }}</p>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </section>
      <!-- Appino Great Feature END -->

      <!-- Amazing Feature -->

      <!-- Amazing Feature END -->

      <!-- Meet the Team -->

      <section id="team" class="overview-block-ptb white-bg">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="heading-title">
                <h2 class="title iq-tw-6">
                  {{ $t("team.title") }}
                </h2>
                <div class="divider" />
                <p>{{ $t("team.discription") }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-lg-3 col-md-3">
              <div class="iq-team">
                <img
                  src="/intro/images/team/01.jpg"
                  class="img-responsive center-block"
                  alt="#"
                >
                <div class="iq-team-info text-center">
                  <h4 class="iq-font-white iq-tw-5">
                    {{ $t("team.member1") }}
                  </h4>
                  <span class="team-post iq-tw-5">{{
                    $t("team.member1title")
                  }}</span>
                  <div class="share iq-mt-15">
                    <span>
                      <i class="fa fa-share-alt iq-mr-10" aria-hidden="true" />
                      Share With</span>
                    <nav>
                      <a href="javascript:void(0)"><i class="fa fa-twitter" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-facebook" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-google" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-github" /></a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 col-md-3">
              <div class="iq-team re7-mt-50">
                <img
                  src="/intro/images/team/02.jpg"
                  class="img-responsive center-block"
                  alt="#"
                >
                <div class="iq-team-info text-center">
                  <h4 class="iq-font-white iq-tw-5">
                    {{ $t("team.member2") }}
                  </h4>
                  <span class="team-post iq-tw-5">{{
                    $t("team.member2title")
                  }}</span>
                  <div class="share iq-mt-15">
                    <span>
                      <i class="fa fa-share-alt iq-mr-10" aria-hidden="true" />
                      Share With</span>
                    <nav>
                      <a href="javascript:void(0)"><i class="fa fa-twitter" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-facebook" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-google" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-github" /></a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 col-md-3 re-mt-30">
              <div class="iq-team">
                <img
                  src="/intro/images/team/03.jpg"
                  class="img-responsive center-block"
                  alt="#"
                >
                <div class="iq-team-info text-center">
                  <h4 class="iq-font-white iq-tw-5">
                    {{ $t("team.member3") }}
                  </h4>
                  <span class="team-post iq-tw-5">{{
                    $t("team.member3title")
                  }}</span>
                  <div class="share iq-mt-15">
                    <span>
                      <i class="fa fa-share-alt iq-mr-10" aria-hidden="true" />
                      Share With</span>
                    <nav>
                      <a href="javascript:void(0)"><i class="fa fa-twitter" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-facebook" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-google" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-github" /></a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 col-md-3 re-mt-30">
              <div class="iq-team">
                <img
                  src="/intro/images/team/04.jpg"
                  class="img-responsive center-block"
                  alt="#"
                >
                <div class="iq-team-info text-center">
                  <h4 class="iq-font-white iq-tw-5">
                    {{ $t("team.member4") }}
                  </h4>
                  <span class="team-post iq-tw-5">{{
                    $t("team.member4title")
                  }}</span>
                  <div class="share iq-mt-15">
                    <span>
                      <i class="fa fa-share-alt iq-mr-10" aria-hidden="true" />
                      Share With</span>
                    <nav>
                      <a href="javascript:void(0)"><i class="fa fa-twitter" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-facebook" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-google" /></a>
                      <a href="javascript:void(0)"><i class="fa fa-github" /></a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Meet the Team END -->

      <!-- Frequently Asked Questions -->

      <section class="overview-block-ptb grey-bg">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="heading-title">
                <h2 class="title iq-tw-6">
                  {{ $t("fqa.title") }}
                </h2>
                <div class="divider" />
                <p>{{ $t("fqa.discription") }}</p>
              </div>
            </div>
          </div>
          <div id="faqAccordion" class="panel-group">
            <div class="panel panel-default">
              <div
                class="panel-heading accordion-toggle question-toggle collapsed"
                data-toggle="collapse"
                data-parent="#faqAccordion"
                data-target="#question0"
              >
                <h4 class="panel-title">
                  <a href="#" class="ing"> {{ $t("fqa.fqa1") }} </a>
                </h4>
              </div>
              <div
                id="question0"
                class="panel-collapse collapse"
                style="height: 0px;"
              >
                <div class="panel-body">
                  <h5><span class="label label-primary">Answer</span></h5>

                  <p>
                    {{ $t("fqa.fqa1dis") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div
                class="panel-heading accordion-toggle collapsed question-toggle"
                data-toggle="collapse"
                data-parent="#faqAccordion"
                data-target="#question1"
              >
                <h4 class="panel-title">
                  <a href="#" class="ing"> {{ $t("fqa.fqa2") }} </a>
                </h4>
              </div>
              <div
                id="question1"
                class="panel-collapse collapse"
                style="height: 0px;"
              >
                <div class="panel-body">
                  <h5><span class="label label-primary">Answer</span></h5>

                  <p>
                    {{ $t("fqa.fqa2dis") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div
                class="panel-heading accordion-toggle collapsed question-toggle"
                data-toggle="collapse"
                data-parent="#faqAccordion"
                data-target="#question2"
              >
                <h4 class="panel-title">
                  <a href="#" class="ing"> {{ $t("fqa.fqa3") }} </a>
                </h4>
              </div>
              <div
                id="question2"
                class="panel-collapse collapse"
                style="height: 0px;"
              >
                <div class="panel-body">
                  <h5><span class="label label-primary">Answer</span></h5>

                  <p>
                    {{ $t("fqa.fqa3dis") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div
                class="panel-heading accordion-toggle collapsed question-toggle"
                data-toggle="collapse"
                data-parent="#faqAccordion"
                data-target="#question3"
              >
                <h4 class="panel-title">
                  <a href="#" class="ing"> {{ $t("fqa.fqa4") }} </a>
                </h4>
              </div>
              <div
                id="question3"
                class="panel-collapse collapse"
                style="height: 0px;"
              >
                <div class="panel-body">
                  <h5><span class="label label-primary">Answer</span></h5>
                  <p>
                    {{ $t("fqa.fqa4dis") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- Frequently Asked Questions END -->

    <!-- Frequently Asked Questions -->
    </div>

    <div class="footer">
      <!-- Get in Touch -->

      <section id="contact-us" class="iq-our-touch iq-mt-100">
        <div class="container">
          <div class="iq-get-in iq-pall-40 white-bg">
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <h4 class="heading-left iq-tw-6 iq-pb-20 iq-mb-40">
                  {{ $t("contact.contact") }}
                </h4>
                <div id="formmessage">
                  Success/Error Message Goes Here
                </div>
                <form
                  id="contactform"
                  class="form-horizontal"
                  method="post"
                  action="../php/contact-form.php"
                >
                  <div class="contact-form">
                    <div class="section-field">
                      <input
                        id="name"
                        type="text"
                        :placeholder="$t('contact.name')"
                        name="name"
                      >
                    </div>
                    <div class="section-field">
                      <input
                        type="email"
                        :placeholder="$t('contact.email')"
                        name="email"
                      >
                    </div>
                    <div class="section-field">
                      <input
                        type="text"
                        :placeholder="$t('contact.phone')"
                        name="phone"
                      >
                    </div>

                    <div class="section-field textarea">
                      <textarea
                        class="input-message"
                        :placeholder="$t('contact.message')"
                        rows="6"
                        name="message"
                      />
                    </div>
                    <input type="hidden" name="action" value="sendEmail">
                    <button
                      id="submit"
                      name="submit"
                      type="submit"
                      value="Send"
                      class="button iq-mt-30"
                    >
                      {{ $t("contact.send") }}
                    </button>
                  </div>
                </form>
                <div id="ajaxloader" style="display: none;">
                  <img
                    class="center-block mt-30 mb-30"
                    src="/intro/images/ajax-loader.gif"
                    alt="#"
                  >
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 re-mt-30">
                <div class="contact-info iq-pall-60 iq-pt-0">
                  <h4 class="heading-left iq-tw-6 iq-pb-20 iq-mb-40">
                    {{ $t("contact.contactus") }}
                  </h4>
                  <v-row class="iq-fancy-box-02">
                    <div class="iq-icon green-bg">
                      <i aria-hidden="true" class="ion-ios-location-outline" />
                    </div>
                    <v-col class="fancy-content">
                      <h5 class="iq-tw-6">
                        {{ $t("contact.address") }}
                      </h5>
                      <span class="lead iq-tw-6">{{
                        $t("contact.addressdis")
                      }}</span>
                    </v-col>
                  </v-row>
                  <v-row class="iq-fancy-box-02 iq-mt-40">
                    <div class="iq-icon green-bg">
                      <i aria-hidden="true" class="ion-ios-telephone-outline" />
                    </div>
                    <v-col class="fancy-content">
                      <h5 class="iq-tw-6">
                        {{ $t("contact.contactphone") }}
                      </h5>
                      <span class="lead iq-tw-6">
                        {{ $t("contact.contactnumber") }}</span>
                      <p class="iq-mb-0">
                        Mon-Fri 8:00am - 8:00pm
                      </p>
                    </v-col>
                  </v-row>
                  <v-row class="iq-fancy-box-02 iq-mt-40 iq-ml-10">
                    <div class="iq-icon green-bg">
                      <i aria-hidden="true" class="ion-ios-email-outline" />
                    </div>
                    <v-col class="fancy-content">
                      <h5 class="iq-tw-6">
                        {{ $t("contact.contactmail") }}
                      </h5>
                      <span class="lead iq-tw-6">{{
                        $t("contact.contactmaildis")
                      }}</span>
                      <p class="iq-mb-0">
                        24 X 7 online support
                      </p>
                    </v-col>
                  </v-row>
                  <ul class="info-share">
                    <li>
                      <a href="javascript:void(0)"><i class="fa fa-twitter" /></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fa fa-facebook" /></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fa fa-google" /></a>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><i class="fa fa-github" /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Get in Touch END -->

      <!-- Footer -->

      <footer class="iq-footer white-bg text-center">
        <div class="container">
          <div class="row iq-ptb-60">
            <div class="col-sm-12">
              <div class="heading-title iq-mb-40">
                <h2 class="title iq-tw-6">
                  {{ $t("intro.news") }}
                </h2>
                <div class="divider" />
              </div>
            </div>
            <div class="col-sm-12">
              <form class="form-inline iq-subscribe">
                <div class="form-group">
                  <input
                    id="exampleInputName2"
                    type="text"
                    class="form-control"
                    :placeholder="$t('intro.emailaddess')"
                  >
                </div>
                <button class="button iq-ml-25">
                  {{ $t("intro.subscribe") }}
                </button>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="footer-copyright iq-ptb-20">
                {{ $t("intro.right") }} <a> {{ $t("intro.ostazteam") }}</a>.
              </div>
            </div>
          </div>
        </div>
      </footer>

    <!-- Footer END -->
    </div>

    <!-- back-to-top -->

    <div id="back-to-top">
      <a class="top" href="#top"> <i class="ion-ios-upload-outline" /> </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: true,
      email: '',
      password: ''

    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('student', {
          data: {
            email: this.email,
            password: this.password
          }
        }).catch((e) => {
          console.log(e.message)
          this.snackbar = true
          this.scolor = 'error'
          this.stext = 'Please enter correct username and password'
        })
        // if (this.redirectable) {
        this.$router.push('/st')
        //   return
        // }
        //
        // this.redirect()
        // const response = await AuthService.login(credentials)
        // this.msg = response.msg
        // const token = response.token
        // const user = response.user
        // this.$store.dispatch('login', { token, user });
        if (this.$auth.loggedIn) {
          console.log('Successfully Logged In')
          // this.$route.push(localePath('/'))
          this.snackbar = true
          this.scolor = 'success'
          this.stext = 'Successfully Logged In'
        }
      } catch (e) {
        this.snackbar = true
        this.scolor = 'error'
        this.stext = 'Something went wrong'
      }
    },

    toRegister () {
      this.isLogin = false
    },
    reloadthis () {
      location.reload()
    },
    changeToEn () {
      this.$i18n.locale = 'en'
      window.history.replaceState('', '', this.switchLocalePath(''))
      // this.$store.dispatch("setLangEn", "en");
      // this.$store.dispatch("setDirEn", "ltr");
      this.$router.go()
    },
    changeToAr () {
      this.$i18n.locale = 'ar'
      window.history.replaceState('', '', this.switchLocalePath('ar'))
      // this.$store.dispatch("setLangAr", "ar");
      // this.$store.dispatch("setDirAr", "rtl");
      this.$router.go()
    }
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        dir: this.$i18n.locale === 'ar' ? 'rtl' : 'ltr'
      },
      link: [
        { rel: 'stylesheet', href: '/intro/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/intro/css/font-awesome.css' },

        { rel: 'stylesheet', href: '/intro/css/ionicons.min.css' },
        { rel: 'stylesheet', href: '/intro/css/style.css' },
        { rel: 'stylesheet', href: '/intro/css/custom.css' }
      ],
      script: [
        { type: 'module', src: '/intro/js/jquery.min.js' },
        { type: 'module', src: '/intro/js/bootstrap.min.js' },
        { type: 'module', src: '/intro/js/custom.js' }
      ]
    }
  }
}
</script>
