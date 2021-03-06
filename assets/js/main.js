var theme = 'default'
var mode = 'text/html'
var idGenerate = 100

if(window.SO) {
  window.SO.code = 1;
}

$(document).ready(function(){
  var animeBanner = function(){
    $('.hero-cards').clearQueue().stop().animate({ marginTop: "0" }, 1000, function() {
      $('.hero-card-2').clearQueue().stop().animate({ left: "-=250" }, 1000, function() {
        $('.hero-card-4').clearQueue().stop().animate({ left: "-=400" }, 1000, function() {
          $('.hero-card-6').clearQueue().stop().animate({ left: "-=500" }, 1000, function() {

          });
        });
      });
      $('.hero-card-3').clearQueue().stop().animate({ left: "+=250" }, 1000, function() {
        $('.hero-card-5').clearQueue().stop().animate({ left: "+=400" }, 1000, function() {
          $('.hero-card-7').clearQueue().stop().animate({ left: "+=500" }, 1000, function() {

          });
        });
      });
    });
  }

  var tmpImg = new Image();
  tmpImg.src = '/img/sprite.jpg';
  tmpImg.onload = function() {
    $('.hero-cards').css('visibility','visible');
    animeBanner();
  };

  $(window).resize(function() {
    $('.hero-card-2').clearQueue().stop();
    $('.hero-card-3').clearQueue().stop();
    $('.hero-card-4').clearQueue().stop();
    $('.hero-card-5').clearQueue().stop();
    $('.hero-card-6').clearQueue().stop();
    $('.hero-card-7').clearQueue().stop();
    $('.hero-card-8').clearQueue().stop();

    $('.hero-card-2').removeAttr('style');
    $('.hero-card-3').removeAttr('style');
    $('.hero-card-4').removeAttr('style');
    $('.hero-card-5').removeAttr('style');
    $('.hero-card-6').removeAttr('style');
    $('.hero-card-7').removeAttr('style');
    $('.hero-card-8').removeAttr('style');
    animeBanner();
  });

  $('textarea.bind-code-example').each(function(i, block) {
    if($(block).attr('mode')) {
      mode = $(block).attr('mode')
    }
    CodeMirror.fromTextArea(block, {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
  });
  $('textarea.bind-just-code').each(function(i, block) {
    var code = $(block).val()
    var mode = $(block).attr('mode')
    CodeMirror.fromTextArea(block, {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
  });
  $('textarea.bind-code').each(function(i, block) {
    var code = $(block).val()
    var mode = $(block).attr('mode')
    var border = $(block).attr('border')
    var absolute = $(block).attr('header-absolute')
    var execMobileuiBind = $(block).attr('exec-mobileui-bind')
    var replace = $(block).attr('replace')
    var hidden = $(block).attr('hidden')
    var multiplatform = $(block).attr('multiplatform')
    var heightPreview = $(block).attr('height-preview')
    var idResult = $(block).attr('id-result')
    var customClass = $(block).attr('custom-class')
    if(replace) {
      replace = replace.split('|');
      for(var i in replace){
        code = code.replace(new RegExp(replace[i].split(',')[0], 'g'), replace[i].split(',')[1]);
      }
    }
    if(absolute) {
      code = code.replace(new RegExp('"header', 'g'), '"header header-absolute')
    }
    var resultStyle = ''
    var resultClass = 'result'
    var id = idResult ? idResult : ++idGenerate;
    $(block).attr('id',id+'_code');
    var attrs = ' id="'+id+'" '
    if(border) {
      resultClass += ' with-border'
    }
    if(heightPreview) {
      resultStyle += 'height:'+heightPreview
      resultClass += ' height-change'
    }
    if(customClass) {
      resultClass += ' ' + customClass;
    }
    var divHeader = '<div class="header-bind-code">';
    if(multiplatform) {
      divHeader += '<button class="small border-green" onclick="previewPlatform(this, '+id+', 1)">Preview Android</button>';
      divHeader += '<button class="small" onclick="previewPlatform(this, '+id+', 2)">Preview iOS</button>';
    } else {
      divHeader += '<button class="small border-green" onclick="showPreview(this, '+id+')">Preview</button>';
    }
    divHeader += '<button class="small" onclick="showCode(this, '+id+')">Code</button>';
    divHeader += '</div>'
    if(code.indexOf('openPage(') >= 0) {
      code = code.replace('openPage(','openPageDemo('+id+',');
    }
    $(block).after(divHeader+'<div '+attrs+' class="'+resultClass+'" style="'+resultStyle+'">'+code+'<div class="cls"></div></div><div class="line"></div>')
    if(execMobileuiBind){
      setTimeout(function(){
        if(MobileUI && MobileUI.bind){
          MobileUI.bind();
        }
      },500);
    }
  });

  var $document = $(document);
  var $element = $('.menuland');
  var className = 'hasScrolled';

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  var checkScroll = function(){
    if ($document.scrollTop() >= 580) {
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  }
  var checkHashSection = function(){
    var found=false;
    $('.content-doc-reader').each(function(i,e){
      if(!found) {
        if(checkVisible(e)){
          found=true;
          var idDoc = $(e).find('h2.title-doc').attr('id');
          $('.menuland a').removeClass('active');
          $('.menuland a[href="#'+idDoc+'"]').addClass('active');
          window.history.replaceState("", document.title, '#'+idDoc);
        }
      }
    });
  }

  checkScroll()
  checkHashSection()

  $document.scroll(function() {
    checkScroll()
    checkHashSection()
  });

  $('.tableDoc').each(function(i,e){
    var elm = $(e);
    if((elm.find('tr').length-1) > 4) {
      var trs = elm.find('tr')
      for(i in trs){
        if(i > 4) {
            $(trs[i]).addClass('hidden')
        }
      }
      var bt = $('<button class="show-doc">Show all '+(elm.find('tr').length-1)+' features.</button>');
      bt.click(function(){
        if($(this).text().indexOf('Hide') < 0) {
          $(this).prev().find('tr').removeClass('hidden')
          $(this).text('Hide features table');
        } else {
          $(this).text('Show all '+($(this).prev().find('tr').length-1)+' features');
          var trs = $(this).prev().find('tr')
          for(i in trs){
            if(i > 4) {
                $(trs[i]).addClass('hidden')
            }
          }
          $document.scrollTop($(this).position().top - 295)
        }
      });
      elm.parent().after(bt);
    }
  });

})

window.showPreview = function(e, id){
  $(e).parent().find('.border-green').removeClass('border-green');
  $(e).addClass('border-green');
  $('#'+id).removeClass('hidden');
  if($('textarea[id="'+id+'_code"]').next().is('.CodeMirror')){
    $('textarea[id="'+id+'_code"]').next().addClass('hidden');
  }
}

window.showCode = function(e, id){
  $(e).parent().find('.border-green').removeClass('border-green');
  $(e).addClass('border-green');
  $('#'+id).addClass('hidden');
  if(!$('textarea[id="'+id+'_code"]').is('.binded')){
    $('textarea[id="'+id+'_code"]').addClass('binded');
    $('#'+id).after($('textarea[id="'+id+'_code"]'));
    CodeMirror.fromTextArea($('textarea[id="'+id+'_code"]')[0], {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
  } else {
    if($('textarea[id="'+id+'_code"]').next().is('.CodeMirror')){
      $('textarea[id="'+id+'_code"]').next().removeClass('hidden');
    }
  }
}

window.previewPlatform = function(e, id, p){
  $(e).parent().find('.border-green').removeClass('border-green');
  $(e).addClass('border-green');
  $('#'+id).removeClass('hidden');
  if($('textarea[id="'+id+'_code"]').next().is('.CodeMirror')){
    $('textarea[id="'+id+'_code"]').next().addClass('hidden');
  }
  if(p === 1){
    $('#'+id).removeClass('platform-ios').addClass('platform-android');
    SO.code = 1;
    $('#'+id).css('max-width','400px');
  } else {
    $('#'+id).removeClass('platform-android').addClass('platform-ios');
    SO.code = 2;
    $('#'+id).css('max-width','320px');
  }
}

window.openPageDemo = function(id, p, params, callback){
  if(arguments.length===3) {
    callback = params
  }
  var xhttp = new XMLHttpRequest();
  if(p.indexOf('.html') < 0){
    p =p+'.html';
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var page = this.responseText;
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('backPage()','backPage(\''+p+'\')');
      var body = document.getElementById(id)
      var div = document.createElement('div')
      div.setAttribute('class','box-block')
      div.setAttribute('id',p)
      div.innerHTML = page
      body.appendChild(div)
      window.PAGE.handePage++
      var firstStyle = 'z-index:'+window.PAGE.handePage
      var secondStyle = ';transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;transition-timing-function: cubic-bezier(0.36,0.66,0.04,1);'
      var newStyle = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
      if(newStyle) {
        newStyle += ' '+firstStyle + secondStyle
      } else {
        newStyle = firstStyle + secondStyle
      }
      document.getElementById(p).getElementsByClassName('page')[0].setAttribute("style", newStyle);
      if(callback) {
        window.dispatch(callback, [params]);
      }
      var newClass = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('class')
      newClass += ' show'
      setTimeout(function(){
        document.getElementById(p).getElementsByClassName('page')[0].setAttribute('class',newClass)
        setTimeout(function(){
          var style = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
          style = style.replace(secondStyle,'')
          document.getElementById(p).getElementsByClassName('page')[0].setAttribute('style',style)
        },280)
      },10)
    }
  };
  xhttp.open("GET", p + '?cache='+new Date().getTime(), true);
  xhttp.send();
}

window.openPopoverLand = function(p){
  var button = event.target;
  var rect = button.getBoundingClientRect();
  var name = p;
  var p = document.getElementById(p);
  var e = document.createElement('div');
  e.className = 'backdrop backdrop-popover';
  p.parentNode.appendChild(e);
  e.addEventListener('click', function(evt){
    window.closePopover(name);
  });
  p.addEventListener('click', function(evt){
    window.closePopover(name);
  });
  p.style += ';top: 110%;right: 10px;transform-origin: right top 0px;transform: scale(1);';
  p.classList.add('show');
  if(SO.code === 2) {
    p.style.top = '45px';
    p.style.right = '5px';
    var divArrow = document.createElement('div');
    divArrow.classList.add('popover-arrow');
    p.parentNode.appendChild(divArrow);
    divArrow.setAttribute('style','top:40px;right:15px');
  } else {
    var pHeight = p.clientHeight;
    var pWidth = p.clientWidth;
    p.style.height = 0;
    p.style.width = 0;
    p.style.top = '5px';
    setTimeout(function(){
      var style = p.getAttribute('style');
      style += ' ;-webkit-transition: all 200ms ease;transition: all 200ms ease;';
      p.setAttribute('style', style);
      p.style.height = pHeight+'px';
      p.style.width = pWidth+'px';
    })
  }
}
