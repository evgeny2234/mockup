$( document ).ready(function() {

//подключаем бутстрап
var bootstrapCss = $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
var bootstrapTheme = $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">');
var bootstrapJs = $('head').append('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>');

    //Все ID элементов задаются тут. В дальнейшем можно будет управлять этим из PHP скрипта, например.
    var constructor = {  //Все идентификаторы объектор задаются тут. 
        selector: "body",
        containerDiv: "mc-container",
        modalDialog: "mc-modal-dialog",
        modalContent: "mc-modal-content",
        header: {
            modalHeader: "mc-modal-header",
            imgDiv: {
                modalImgDiv: "mc-modal-img-div",
                modalImg: "mc-modal-img"
            },
            titleDiv: {
                modalTitleDiv: "mc-modal-title-div",
                modalName: "mc-modalName",
                modalTitle: "mc-modalTitle",
                close: "mc-close"
            },
        },
        body: {
            modalBody: "mc-modal-body",
            text: "mc-text",
            closeBtn: "mc-close-bottom",
            arrow: "mc-arrow"
        }
    }
    //Стили так-же заданы в обьекте. Для того, чтоб можно было управлять этими параметрами со стороны сервера.
    var cssValues = {   //CSS стили, задаются так-же тут. Затем используем их как значения объекта.
        containerDiv: {
            position: "absolute",
            bottom: "30px",
            right: "30px",
        },
        modalDialog: {
            width: "220px",
        },
        modalContent: {
        },
        header: {
            backgroundColor: "#f1f1f1",
            imgDiv: {
                float: "left",
                display: "inline-block",
                width: "30%",
                modalImg: {
                    width: "30px",
                    borderRadius: "50px", 
                    margin: "10px 0 0 0 ",
                },
            },
            titleDiv: {
                float: "left",
                display: "inline-block",
                width: "65%",
                modalName: {
                    color: "#868789",
                    fontSize: "10px",
                    fontFamily: "Arial",
                    margin: "2px 0px",
                },
                modalTitle: {
                    color: "#a8a8a8",
                    fontSize: "8px",
                    fontFamily: "Arial",
                    margin: "2px 0px",
                },
                close: {
                    position: "absolute",
                    margin: "27px 0px 0px 0px",
                    right: "15px",
                    outline: "none",
                    color: "#4c504f",
                },
            },
        },
        body: {
            text: {
                color: "#929395",
                fontSize: "12px",
                fontFamily: "Arial",
            },
            closeBtn: {
                width: "35px",
                height: "35px",
                borderRadius: "17px",
                backgroundColor: "#00a8f5",
                opacity: "1",
                outline: "none",
                position: "absolute",
                top: "195px",
                right: "-5px",
                color: "#fff",
                fontWeight: "normal",
            },
            arrow: {
                fontSize: "30px",
                position: "absolute",
                top: "-15px",
                left: "30px",
                color: "white",
                borderColor: "black",
                width: "40px",
                height: "30px",
                transform: "rotate(-25deg)",
            },
        },
    };

    function build(constructor, cssValues) {  //функция строит попап-окно и задает ему стили

        var fields = $.getJSON( "https://dev.nexusmedia-ua.com/devtest/", function (data) {
            
            var JSONdata = new Object();  //парсим JSON из которого будем брать все данные. (из него же можем брать стили и ID)
            JSONdata.imageUrl = data.messages[0].image;
            JSONdata.messageText = data.messages[0].message;
            JSONdata.userName = data.messages[0].name;
            JSONdata.userTitle = data.messages[0].title;

                function creator(constructor, JSONdata) {   //данная функция создает структуру DOM попап окна (HTML). Классы из бутстрап - задаются по умолчанию, ID - подтягиваются из обьекта

                    $('' + constructor.selector).append('<div id="' + constructor.containerDiv + '" class="mc-container">');

                    $('#' + constructor.containerDiv).append('<div id="' + constructor.modalDialog + '" class="modal-dialog" role="document">');
                    $('#' + constructor.modalDialog).append('<div id="' + constructor.modalContent + '" class="modal-content">');
                    $('#' + constructor.modalContent).append('<div id="' + constructor.header.modalHeader + '" class="modal-header">');
                    $('#' + constructor.header.modalHeader).append('<div id="' + constructor.header.imgDiv.modalImgDiv + '" class="img-div">');
                        $('#' + constructor.header.imgDiv.modalImgDiv).append('<img id="' + constructor.header.imgDiv.modalImg + '" class="header-img">');
                    $('#' + constructor.header.modalHeader).append('<div id="' + constructor.header.titleDiv.modalTitleDiv + '" class="title-div">');
                        $('#' + constructor.header.titleDiv.modalTitleDiv).append('<h4 id="' + constructor.header.titleDiv.modalName + '" class="header-name">');
                        $('#' + constructor.header.titleDiv.modalTitleDiv).append('<h5 id="' + constructor.header.titleDiv.modalTitle + '" class="header-title">');
                    $('#' + constructor.header.modalHeader).append('<button id="' + constructor.header.titleDiv.close + '" type="button" class="close glyphicon glyphicon-remove" data-dismiss="modal" aria-label="Close">');
                    $('#' + constructor.modalContent).append('<div id="' + constructor.body.modalBody + '" class="modal-body">');
                        $('#' + constructor.body.modalBody).append('<p id="' + constructor.body.text + '" class="body-text">');
                    $('#' + constructor.containerDiv).append('<button id="' + constructor.body.closeBtn + '"type="button" class="close glyphicon glyphicon-remove" data-dismiss="modal" aria-label="Close" >');
                        $('#' + constructor.body.modalBody).append('<div id="'+ constructor.body.arrow + '" class="glyphicon glyphicon-tint">');

                    $('.header-img').attr('src', '' + JSONdata.imageUrl);  //заполняем поля, изпользуя данные из JSON файла
                    $('.header-name').text('' + JSONdata.userName);
                    $('.header-title').text('' + JSONdata.userTitle);
                    $('.body-text').text('' + JSONdata.messageText);

                    var alternate = true;

                    var close = $( "#" + constructor.header.titleDiv.close ); // анимация окна
                    close.click(function(){
                        $( ".modal-dialog" ).fadeOut( "slow", function() {
                            closeBtn.removeClass("glyphicon-remove");
                            closeBtn.addClass("glyphicon-envelope");
                            closeBtn.css({
                                top: "-32px",
                            });
                        });
                        alternate = !alternate;
                    });


                    var closeBtn = $( "#" + constructor.body.closeBtn );  // анимация окна
                    closeBtn.click(function(){ 
                        
                        if (alternate) {
                           $( ".modal-dialog" ).fadeOut( "slow", function() {
                                closeBtn.removeClass("glyphicon-remove");
                                closeBtn.addClass("glyphicon-envelope");
                                closeBtn.css({
                                    top: "-32px",
                                });
                            });
                            
                        } else {
                            closeBtn.css({
                                top: "195px",
                            });
                            $( ".modal-dialog" ).fadeIn( "slow", function() {
                                closeBtn.removeClass("glyphicon-envelope");
                                closeBtn.addClass("glyphicon-remove");
                                
                            });
                        }
                        alternate = !alternate;
                    });
                    
                }


                function decorator(constructor, cssValues, JSONdata) {   //задаем CSS стили обьектам

                    $("#" + constructor.containerDiv ).css({
                        position: cssValues.containerDiv.position,
                        right: cssValues.containerDiv.right,
                        bottom: cssValues.containerDiv.bottom,
                    });

                    $("#" + constructor.header.imgDiv.modalImg ).css({
                        width: cssValues.header.imgDiv.modalImg.width,
                        borderRadius: cssValues.header.imgDiv.modalImg.borderRadius,
                        margin: cssValues.header.imgDiv.modalImg.margin,
                    });

                    $("#" + constructor.header.imgDiv.modalImgDiv ).css({
                        display: cssValues.header.imgDiv.display,
                        width: cssValues.header.imgDiv.width,
                        float: cssValues.header.imgDiv.float
                    });

                    $("#" + constructor.header.titleDiv.modalTitleDiv ).css({
                        display: cssValues.header.titleDiv.display,
                        width: cssValues.header.titleDiv.width,
                        float: cssValues.header.titleDiv.float
                    });

                    $("#" + constructor.body.text ).css({
                        color: cssValues.body.text.color,
                        fontSize: cssValues.body.text.fontSize,
                        fontFamily: cssValues.body.text.fontFamily
                    });

                    $("#" + constructor.header.titleDiv.modalName ).css({
                        fontSize: cssValues.header.titleDiv.modalName.fontSize,
                        color: cssValues.header.titleDiv.modalName.color,
                        fontFamily: cssValues.header.titleDiv.modalName.fontFamily,
                    });

                    $("#" + constructor.header.modalHeader ).css({
                        backgroundColor: cssValues.header.backgroundColor,
                    });

                    $("#" + constructor.header.titleDiv.close ).css({
                        position: cssValues.header.titleDiv.close.position,
                        margin: cssValues.header.titleDiv.close.margin,
                        right: cssValues.header.titleDiv.close.right,
                        outline: cssValues.header.titleDiv.close.outline,
                        color: cssValues.header.titleDiv.close.color,
                    });

                    $("#" + constructor.body.closeBtn ).css({
                        backgroundColor: cssValues.body.closeBtn.backgroundColor,
                        width: cssValues.body.closeBtn.width,
                        height: cssValues.body.closeBtn.height,
                        borderRadius: cssValues.body.closeBtn.borderRadius,
                        opacity: cssValues.body.closeBtn.opacity,
                        outline: cssValues.body.closeBtn.outline,
                        position: cssValues.body.closeBtn.position,
                        top: cssValues.body.closeBtn.top,
                        right: cssValues.body.closeBtn.right,
                        color: cssValues.body.closeBtn.color,
                        fontWeight: cssValues.body.closeBtn.fontWeight,
                    });

                    $("#" + constructor.header.titleDiv.modalTitle ).css({
                        fontSize: cssValues.header.titleDiv.modalTitle.fontSize,
                        color: cssValues.header.titleDiv.modalTitle.color,
                        fontFamily: cssValues.header.titleDiv.modalTitle.fontFamily,
                    });

                    $("#" + constructor.modalDialog).css({
                        width: cssValues.modalDialog.width
                    });

                    $("#" + constructor.body.arrow).css({
                        fontSize: cssValues.body.arrow.fontSize,
                        position: cssValues.body.arrow.position,
                        top: cssValues.body.arrow.top,
                        left: cssValues.body.arrow.left,
                        color: cssValues.body.arrow.color,
                        borderColor: cssValues.body.arrow.borderColor,
                        width: cssValues.body.arrow.width,
                        height: cssValues.body.arrow.height,
                        transform: cssValues.body.arrow.transform,
                    });
                }

                creator(constructor, JSONdata); 
                decorator(constructor, cssValues, JSONdata);

        });
    }

    build(constructor, cssValues);
    
});