
$(function () {
    $('.drop-target').click(tooltipInit);
});

$(window).resize(function () {
   $('drop.drop-open').removeClass('drop-open');
});

function tooltipInit(e) {

    var id = e.target.getAttribute("data-tooltip");

    var drop = new Drop ({
        target: e.target,
        content: generateTooltipCode(id),
        position: 'bottom center',
        openOn: 'click',
        classes: 'drop-theme-ya',
        constrainToWindow: true,
        constrainToScrollParent: true,
        tetherOptions: {
            attachment: 'top center',
            targetModifier: 'visible',
            constraints: [
                {
                    to: 'scrollParent',
                    attachment: 'together none',
                    pin: true,
                },
            ]
        }
    });

    drop.on('open', function () {

        var targetMid =  Math.floor(this.target.getBoundingClientRect().left + (this.target.getBoundingClientRect().right - this.target.getBoundingClientRect().left)/2);
        var offset = targetMid - this.drop.getBoundingClientRect().left;
        var arrow = this.drop.querySelector('.drop-arrow');
        if(offset > 320){
            offset = 320;
        }
        if (offset < 20){
            offset = 20;
        }
        arrow.style.left = offset + 'px';
    });

    drop.open();
    $(e.target).unbind('click');
}

function generateTooltipCode(id) {

    var data = getTooltipDataById(id);

    var ttContent = document.createElement('div');

    var ttEdit = document.createElement('a');
    ttEdit.setAttribute('href','edit-event.html');
    ttEdit.classList.add('tooltip__edit');
    ttEdit.classList.add('button_type_circle');

    ttEdit.innerHTML = '<svg class="icon icon-edit"><use xlink:href="img/icons_sprite.svg#edit"></use></svg>';

    var ttTitle = document.createElement('h3');
    ttTitle.classList.add('tooltip__title');
    ttTitle.innerHTML = data.title;

    var ttDate = document.createElement('span');
    ttDate.classList.add('tooltip__date');
    ttDate.innerHTML = data.date;

    var ttTime = document.createElement('span');
    ttTime.classList.add('tooltip__time');
    ttTime.innerHTML = data.timeStart + '&mdash;' + data.timeFinish;

    var ttRoom = document.createElement('span');
    ttRoom.classList.add('tooltip__room');
    ttRoom.innerHTML = data.room;

    var ttOrganizer = document.createElement('div');
    ttOrganizer.classList.add('tooltip-organizer');

    var ttOrganizerName = document.createElement('span');
    ttOrganizerName.classList.add('organizer__name');
    ttOrganizerName.innerHTML = data.organizer.name;

    var ttOrganizerAvatar = document.createElement('div');
    ttOrganizerAvatar.classList.add('tooltip__avatar');

    var ttOrganizerAvatarImage = document.createElement('img');
    ttOrganizerAvatarImage.src = data.organizer.avatar;
    ttOrganizerAvatar.appendChild(ttOrganizerAvatarImage);

    var ttUsers = document.createElement('span');
    ttUsers.classList.add('tooltip__users');
    ttUsers.innerHTML = ' и ' + data.users + ' участников';

    ttOrganizer.appendChild(ttOrganizerAvatar);
    ttOrganizer.appendChild(ttOrganizerName);
    ttOrganizer.appendChild(ttUsers);

    ttContent.appendChild(ttEdit);
    ttContent.appendChild(ttTitle);
    ttContent.appendChild(ttDate);
    ttContent.appendChild(ttTime);
    ttContent.appendChild(ttRoom);
    ttContent.appendChild(ttOrganizer);

    return ttContent;
}

function getTooltipDataById(id) {
    return {
        title: "Рассуждения о высоком",
        date: "14 декабря",
        timeStart: "15:00",
        timeFinish: "17:00",
        room: "Желтый дом",
        organizer: {
            name: "Дарт Вейдер",
            avatar: 'img/weider.jpg'
        },
        users: 5
    };
}

