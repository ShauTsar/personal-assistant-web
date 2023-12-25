import React, {useEffect, useState} from 'react';
import "../styles/Calendar.css"
import $ from 'jquery'; // Import jQuery
import 'moment';
import Header from "./Header"; // Ensure Moment.js is installed

function CalendarPage() {
    const darkMode = true; // Устанавливаем темную тему
    useEffect(() => {
        var monthEl = $(".c-main");
        var dataCel = $(".c-cal__cel");
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var monthText = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        var indexMonth = month;
        var todayBtn = $(".c-today__btn");
        var addBtn = $(".js-event__add");
        var saveBtn = $(".js-event__save");
        var closeBtn = $(".js-event__close");
        var winCreator = $(".js-event__creator");
        var inputDate = $(this).data();
        let today;
        today = year + "-" + month + "-" + day;


        function defaultEvents(dataDay,dataName,dataNotes,classTag){
            var date = $('*[data-day='+dataDay+']');
            date.attr("data-name", dataName);
            date.attr("data-notes", dataNotes);
            date.addClass("event");
            date.addClass("event--" + classTag);
        }

        defaultEvents(today, 'YEAH!','Today is your day','important');
        defaultEvents('2022-12-25', 'MERRY CHRISTMAS','A lot of gift!!!!','festivity');
        defaultEvents('2022-05-04', "LUCA'S BIRTHDAY",'Another gifts...?','birthday');
        defaultEvents('2022-03-03', "MY LADY'S BIRTHDAY",'A lot of money to spent!!!!','birthday');


// ------ functions control -------

//button of the current day
        todayBtn.on("click", function() {
            if (month < indexMonth) {
                var step = indexMonth % month;
                movePrev(step, true);
            } else if (month > indexMonth) {
                var step = month - indexMonth;
                moveNext(step, true);
            }
        });

//higlight the cel of current day
        dataCel.each(function() {
            if ($(this).data("day") === today) {
                $(this).addClass("isToday");
                fillEventSidebar($(this));
            }
        });

//window event creator
        addBtn.on("click", function() {
            winCreator.addClass("isVisible");
            $("body").addClass("overlay");
            dataCel.each(function() {
                if ($(this).hasClass("isSelected")) {
                    today = $(this).data("day");
                    document.querySelector('input[type="date"]').value = today;
                } else {
                    document.querySelector('input[type="date"]').value = today;
                }
            });
        });
        closeBtn.on("click", function() {
            winCreator.removeClass("isVisible");
            $("body").removeClass("overlay");
        });
        saveBtn.on("click", function() {
            var inputName = $("input[name=name]").val();
            var inputDate = $("input[name=date]").val();
            var inputNotes = $("textarea[name=notes]").val();
            var inputTag = $("select[name=tags]")
                .find(":selected")
                .text();

            dataCel.each(function() {
                if ($(this).data("day") === inputDate) {
                    if (inputName != null) {
                        $(this).attr("data-name", inputName);
                    }
                    if (inputNotes != null) {
                        $(this).attr("data-notes", inputNotes);
                    }
                    $(this).addClass("event");
                    if (inputTag != null) {
                        $(this).addClass("event--" + inputTag);
                    }
                    fillEventSidebar($(this));
                }
            });

            winCreator.removeClass("isVisible");
            $("body").removeClass("overlay");
            $("#addEvent")[0].reset();
        });

//fill sidebar event info
        function fillEventSidebar(self) {
            $(".c-aside__event").remove();
            var thisName = self.attr("data-name");
            var thisNotes = self.attr("data-notes");
            var thisImportant = self.hasClass("event--important");
            var thisBirthday = self.hasClass("event--birthday");
            var thisFestivity = self.hasClass("event--festivity");
            var thisEvent = self.hasClass("event");

            switch (true) {
                case thisImportant:
                    $(".c-aside__eventList").append(
                        "<p class='c-aside__event c-aside__event--important'>" +
                        thisName +
                        " <span> • " +
                        thisNotes +
                        "</span></p>"
                    );
                    break;
                case thisBirthday:
                    $(".c-aside__eventList").append(
                        "<p class='c-aside__event c-aside__event--birthday'>" +
                        thisName +
                        " <span> • " +
                        thisNotes +
                        "</span></p>"
                    );
                    break;
                case thisFestivity:
                    $(".c-aside__eventList").append(
                        "<p class='c-aside__event c-aside__event--festivity'>" +
                        thisName +
                        " <span> • " +
                        thisNotes +
                        "</span></p>"
                    );
                    break;
                case thisEvent:
                    $(".c-aside__eventList").append(
                        "<p class='c-aside__event'>" +
                        thisName +
                        " <span> • " +
                        thisNotes +
                        "</span></p>"
                    );
                    break;
            }
        };
        dataCel.on("click", function() {
            var thisEl = $(this);
            var thisDay = $(this)
                .attr("data-day")
                .slice(8);
            var thisMonth = $(this)
                .attr("data-day")
                .slice(5, 7);

            fillEventSidebar($(this));

            $(".c-aside__num").text(thisDay);
            $(".c-aside__month").text(monthText[thisMonth - 1]);

            dataCel.removeClass("isSelected");
            thisEl.addClass("isSelected");

        });

//function for move the months
        function moveNext(fakeClick, indexNext) {
            for (var i = 0; i < fakeClick; i++) {
                $(".c-main").css({
                    left: "-=100%"
                });
                $(".c-paginator__month").css({
                    left: "-=100%"
                });
                switch (true) {
                    case indexNext:
                        indexMonth += 1;
                        break;
                }
            }
        }
        function movePrev(fakeClick, indexPrev) {
            for (var i = 0; i < fakeClick; i++) {
                $(".c-main").css({
                    left: "+=100%"
                });
                $(".c-paginator__month").css({
                    left: "+=100%"
                });
                switch (true) {
                    case indexPrev:
                        indexMonth -= 1;
                        break;
                }
            }
        }

//months paginator
        function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
            switch (true) {
                case next:
                    $(buttonId).on("click", function() {
                        if (indexMonth >= 2) {
                            $(mainClass).css({
                                left: "+=100%"
                            });
                            $(monthClass).css({
                                left: "+=100%"
                            });
                            indexMonth -= 1;
                        }
                        return indexMonth;
                    });
                    break;
                case prev:
                    $(buttonId).on("click", function() {
                        if (indexMonth <= 11) {
                            $(mainClass).css({
                                left: "-=100%"
                            });
                            $(monthClass).css({
                                left: "-=100%"
                            });
                            indexMonth += 1;
                        }
                        return indexMonth;
                    });
                    break;
            }
        }

        buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
        buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
        moveNext(indexMonth - 1, false);

//fill the sidebar with current day
        $(".c-aside__num").text(day);
        $(".c-aside__month").text(monthText[month - 1]);

    }, []);

    return (
        <div>
            <Header />
            <header>
                <div className="wrapper">
                    <div className="c-monthyear">
                        <div className="c-month">
                            <span id="prev" className="prev fa fa-angle-left" aria-hidden="true" />
                            <div id="c-paginator">
                                <span className="c-paginator__month">JANUARY</span>
                                <span className="c-paginator__month">FEBRUARY</span>
                                <span className="c-paginator__month">MARCH</span>
                                <span className="c-paginator__month">APRIL</span>
                                <span className="c-paginator__month">MAY</span>
                                <span className="c-paginator__month">JUNE</span>
                                <span className="c-paginator__month">JULY</span>
                                <span className="c-paginator__month">AUGUST</span>
                                <span className="c-paginator__month">SEPTEMBER</span>
                                <span className="c-paginator__month">OCTOBER</span>
                                <span className="c-paginator__month">NOVEMBER</span>
                                <span className="c-paginator__month">DECEMBER</span>
                            </div>
                            <span id="next" className="next fa fa-angle-right" aria-hidden="true" />
                        </div>
                        <span className="c-paginator__year">2023</span>
                    </div>
                    <div className="c-sort">
                        <a className="o-btn c-today__btn" href="javascript:;">TODAY</a>
                    </div>
                </div>
            </header>
            <div className="wrapper">
                <div className="c-calendar">
                    <div className="c-calendar__style c-aside">
                        <a className="c-add o-btn js-event__add" href="javascript:;">add event <span className="fa fa-plus" /></a>
                        <div className="c-aside__day">
                            <span className="c-aside__num" /> <span className="c-aside__month" />
                        </div>
                        <div className="c-aside__eventList">
                        </div>
                    </div>
                    <div className="c-cal__container c-calendar__style">
                    </div>
                </div>
                <div className="c-event__creator c-calendar__style js-event__creator">
                    <a href="javascript:;" className="o-btn js-event__close">CLOSE <span className="fa fa-close" /></a>
                    <form id="addEvent">
                        <input placeholder="Event name" type="text" name="name" />
                        <input type="date" name="date" />
                        <textarea placeholder="Notes" name="notes" cols={30} rows={10} defaultValue={""} />
                        <select name="tags">
                            <option value="event">event</option>
                            <option value="important">important</option>
                            <option value="birthday">birthday</option>
                            <option value="festivity">festivity</option>
                        </select>
                    </form>
                    <br />
                    <a href="javascript:;" className="o-btn js-event__save">SAVE <span className="fa fa-save" /></a>
                </div>
            </div>
        </div>
    );
}
export default CalendarPage;