/*--------loader script-----------*/
$(function() {
    var loading = $('#loadbar').hide();
    $(document)
        .ajaxStart(function() {
            loading.show();
        }).ajaxStop(function() {
            loading.hide();
        });

    var questionNo = 0;
    var correctCount = 0;
    var q = [{
            'Q': 'Eu comprei 500 balas, comi 305 e dei 120 para meu irmão. Com quantas balas eu fiquei?',
            'A': 2,
            'C': ['85', '75', '70']
        },
        {
            'Q': 'Se 1 pato tem 2 patas. Quanto patas tem 35 patos?',
            'A': 3,
            'C': ['50', '60', '70']
        },
        {
            'Q': 'Quanto é 5+5x5?',
            'A': 1,
            'C': ['30', '50', '15']
        },
        {
            'Q': 'Se um cachorro tem 4 patas. Quantas patas tem 48 cachorros?',
            'A': 3,
            'C': ['100', '96', '192']
        },
        {
            'Q': 'Eu comprei 20 CDs de 12,00 reais e 28 DVDs de 10,00 reais. Quanto eu gastei no total?',
            'A': 1,
            'C': ['520', '360', '900']
        }
    ];

    $(document.body).on('click', "label.element-animation", function(e) {
        //ripple start
        var parent, ink, d, x, y;
        parent = $(this);
        if (parent.find(".ink").length == 0)
            parent.prepend("<span class='ink'></span>");

        ink = parent.find(".ink");
        ink.removeClass("animate");

        if (!ink.height() && !ink.width()) {
            d = Math.max(parent.outerWidth(), parent.outerHeight());
            ink.css({
              height: "100px",
              width: "100px"
            });
        }

        x = e.pageX - parent.offset().left - ink.width() / 2;
        y = e.pageY - parent.offset().top - ink.height() / 2;

        ink.css({
          top: y + 'px',
          left: x + 'px'
        }).addClass("animate");
        //ripple end

        var choice = $(this).parent().find('input:radio').val();
        console.log(choice);
        var anscheck = $(this).checking(questionNo, choice); //$( "#answer" ).html(  );      
        q[questionNo].UC = choice;
        if (anscheck) {
          correctCount++;
          q[questionNo].result = "Acertou";
          // $('.text-muted').css({'color': '#5fba7d'});
        } else {
          q[questionNo].result = "Errou";
          // $('.text-muted').css({'color': '#E24825'});
        }
        console.log("CorrectCount:" + correctCount);
        setTimeout(function() {
            $('#loadbar').show();
            $('#quiz').fadeOut();
            questionNo++;
            if ((questionNo + 1) > q.length) {
                alert("Quiz completo! Agora clique em ok para ver suas respostas.");
                $('label.element-animation').unbind('click');
                setTimeout(function() {
                    var toAppend = '';
                    $.each(q, function(i, a) {
                        toAppend += '<tr>'
                        toAppend += '<td>' + (i + 1) + '</td>';
                        toAppend += '<td>' + a.A + '</td>';
                        toAppend += '<td>' + a.UC + '</td>';
                        toAppend += '<td>' + a.result + '</td>';
                        toAppend += '</tr>'
                    });
                    $('#quizResult').html(toAppend);
                    $('#totalCorrect').html("Total de acertos: " + correctCount);
                    $('#quizResult').show();
                    $('#loadbar').fadeOut();
                    $('#result-of-question').show();
                    $('#graph-result').show();
                    chartMake();
                }, 1000);
            } else {
                $('#qid').html(questionNo + 1);
                $('input:radio').prop('checked', false);
                setTimeout(function() {
                    $('#quiz').show();
                    $('#loadbar').fadeOut();
                }, 1500);
                $('#question').html(q[questionNo].Q);
                $($('#f-option').parent().find('label')).html(q[questionNo].C[0]);
                $($('#s-option').parent().find('label')).html(q[questionNo].C[1]);
                $($('#t-option').parent().find('label')).html(q[questionNo].C[2]);
            }
        }, 1000);
    });


    $.fn.checking = function(qstn, ck) {
      var ans = q[questionNo].A;
      if (ck != ans)
        return false;
      else 
        return true;
    };

  // chartMake();
  function chartMake(){
    var chart = AmCharts.makeChart("chartdiv",{
      "type": "serial",
      "theme": "dark",
      "dataProvider": [{
          "name": "Correct",
          "points": correctCount,
          "color": "#00FF00",
          "bullet": "http://i2.wp.com/img2.wikia.nocookie.net/__cb20131006005440/strategy-empires/images/8/8e/Check_mark_green.png?w=250"
      }, {
          "name": "Incorrect",
          "points":q.length-correctCount,
          "color": "red",
          "bullet": "http://4vector.com/i/free-vector-x-wrong-cross-no-clip-art_103115_X_Wrong_Cross_No_clip_art_medium.png"
      }],
      "valueAxes": [{
          "maximum": q.length,
          "minimum": 0,
          "axisAlpha": 0,
          "dashLength": 4,
          "position": "left"
      }],
      "startDuration": 1,
      "graphs": [{
          "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]]</b></span>",
          "bulletOffset": 10,
          "bulletSize": 52,
          "colorField": "color",
          "cornerRadiusTop": 8,
          "customBulletField": "bullet",
          "fillAlphas": 0.8,
          "lineAlpha": 0,
          "type": "column",
          "valueField": "points"
      }],
      "marginTop": 0,
      "marginRight": 0,
      "marginLeft": 0,
      "marginBottom": 0,
      "autoMargins": false,
      "categoryField": "name",
      "categoryAxis": {
          "axisAlpha": 0,
          "gridAlpha": 0,
          "inside": true,
          "tickLength": 0
      }
    });
  }

}); 

