import React, { Component } from 'react';
import * as Moment from 'moment';
import { CView, CWeek, CDay } from '../../style/SCCalendar';
import * as dateUtils from '../../utils/dates';
import { DataKeyFormat } from '../../utils/constants';
import { extendMoment } from 'moment-range';
import cn from 'classnames';
import EventsBox from './EventsBox';

const moment = extendMoment(Moment);
let weekdays = moment.weekdaysShort();

class CalendarView extends Component {
  onSelectDate = (e, date) => {
    this.props.onSelectDate(date);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, id) => {
    const dataId = e.dataTransfer.getData('text');
    const dragEl = document.getElementById(dataId);
    const dropZone = document.getElementById(id);
    dragEl.style.backgroundColor = 'blue';
    dropZone.appendChild(dragEl);
    e.dataTransfer.clearData();
  };

  renderView = () => {
    const { date, events } = this.props;
    const today = moment();
    let weekdays = moment.weekdaysShort();
    const start = dateUtils.getStartOfMonth(date);
    const startWeek = start.week();
    const end = dateUtils.getEndOfMonth(date);
    const endWeek = end.week() === 1 ? 53 : end.week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <CWeek key={week}>
          {weekdays.map((d, i) => {
            let currentDay = moment(start)
              .week(week)
              .day(i - 1);
            let isToday = dateUtils.isSame(today, currentDay, 'day');
            let isSelected = dateUtils.isSame(date, currentDay, 'day');
            let isCurrentMonth = dateUtils.isSame(date, currentDay, 'month');
            let day = currentDay.format('D');
            let datakey = currentDay.format(DataKeyFormat.month);
            return (
              <CDay
                className={cn('c-day', {
                  selected: isSelected,
                  today: isToday,
                  'c-day__prevnext-day': !isCurrentMonth
                })}
                onClick={e => this.onSelectDate(e, currentDay)}
                onDragOver={this.onDragOver}
                onDrop={e => this.onDrop(e, datakey)}>
                <strong className="dfacjcc">{day}</strong>
                <EventsBox id={datakey} events={events[datakey] || []} />
              </CDay>
            );
          })}
        </CWeek>
      );
    }
    return calendar;
  };

  render() {
    return (
      <CView>
        <CWeek
          id="view-header"
          className="c-view__header c-view__header--month">
          {weekdays.map(dayText => {
            return <CDay className="c-day">{dayText}</CDay>;
          })}
        </CWeek>
        {this.renderView()}
      </CView>
    );
  }
}

export default CalendarView;
