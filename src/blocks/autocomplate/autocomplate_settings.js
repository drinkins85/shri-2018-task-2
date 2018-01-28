

$(function () {

    if($( "#users" ).length){

        $('.user-input.closed + .dropdown-btn').click(function () {
            $( "#users" ).autocomplete( "close" );
        });

        let users = [
            {
                id: 1,
                label: "Томас Андерсон",
                firstname: "Томас",
                lastname: "Андерсон",
                homeFloor: "4 этаж",
                avatar: "img/weider.jpg"
            },
            {
                id: 2,
                label: "Дарт Вейдер",
                firstname: "Дарт",
                lastname: "Вейдер",
                homeFloor: "4 этаж",
                avatar: "img/weider.jpg"
            },
            {
                id: 3,
                label: "Лекс Лютер",
                firstname: "Лекс",
                lastname: "Лютер",
                homeFloor: "4 этаж",
                avatar: "img/weider.jpg"
            },
            {
                id: 4,
                label: "Томас Андерсон",
                firstname: "Томас",
                lastname: "Андерсон",
                homeFloor: "4 этаж",
                avatar: "img/weider.jpg"
            },
            {
                id: 5,
                label: "Иванов Иван",
                firstname: "Иванов",
                lastname: "Иван",
                homeFloor: "2 этаж",
                avatar: "img/weider.jpg"
            },
            {
                id: 6,
                label: "Петров Петр",
                firstname: "Петров",
                lastname: "Петр",
                homeFloor: "3 этаж",
                avatar: "img/weider.jpg"
            }
        ];

        $( "#users" ).autocomplete({
            minLength: 0,
            source: users,
            open: function (event, ui) {
                $( "#users" ).addClass('opened');
                return false;
            },
            focus: function( event, ui ) {
                $( "#users" ).val( ui.item.label );
                return false;
            },
            select: function( event, ui ) {
                $( "#users" ).val("");
                if ( $("#user_" + ui.item.id).length ){
                    if(!$("#user_" + ui.item.id).is(":checked")){
                        $("#user_" + ui.item.id).prop('checked', true);
                    }
                } else {
                    $( ".checked-users")
                        .append(`
                            <input type="checkbox" class="checkbox-user" id="user_${ui.item.id}" checked>
                            <div class="checked-user">
                                <div class='checked-user__avatar'><img src='${ui.item.avatar}'></div>
                                <span class="checked-user__name">${ui.item.label}</span>
                                <label class="checked-user__delete" for="user_${ui.item.id}">
                                    <svg class="icon icon-close">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/icons_sprite.svg#close"></use>
                                    </svg>
                                </label>
                            </div>
                        `);
                }


                return false;
            },
            close: function (event, ui) {
                $( "#users" ).removeClass('opened');
                return false;
            }
        })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
            return $( "<li>" )
                .append( `<div>
                           <div class='ui-menu-item__avatar'>
                               <img src='${item.avatar}'>
                           </div>
                           <span class="ui-menu-item__name">
                                ${item.firstname} ${item.lastname}
                           </span>
                           <span class="ui-menu-item__floor">
                                ${item.homeFloor}
                           </span>
                       </div>` )
                .appendTo( ul );
        };

    }

});

