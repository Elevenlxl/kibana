/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */



import PropTypes from 'prop-types';
import React from 'react';

import {
  EuiButton,
  EuiLink,
  EuiInMemoryTable,
} from '@elastic/eui';

import chrome from 'ui/chrome';


export function CalendarsListTable({
  calendarsList,
  onDeleteClick,
  setSelectedCalendarList,
  loading,
  canCreateCalendar,
  canDeleteCalendar,
  mlNodesAvailable,
  itemsSelected
}) {

  const sorting = {
    sort: {
      field: 'calendar_id',
      direction: 'asc',
    }
  };

  const pagination = {
    initialPageSize: 20,
    pageSizeOptions: [10, 20]
  };

  const columns = [
    {
      field: 'calendar_id',
      name: 'ID',
      sortable: true,
      truncateText: true,
      render: (id) => (
        <EuiLink
          href={`${chrome.getBasePath()}/app/ml#/settings/calendars_list/edit_calendar/${id}`}
        >
          {id}
        </EuiLink>
      )
    },
    {
      field: 'job_ids_string',
      name: 'Jobs',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'events_length',
      name: 'Events',
      sortable: true
    }
  ];

  const tableSelection = {
    onSelectionChange: (selection) => setSelectedCalendarList(selection)
  };

  const search = {
    toolsRight: [
      (
        <EuiButton
          size="s"
          data-testid="new_calendar_button"
          key="new_calendar_button"
          href={`${chrome.getBasePath()}/app/ml#/settings/calendars_list/new_calendar`}
          isDisabled={(canCreateCalendar === false || mlNodesAvailable === false)}
        >
          New
        </EuiButton>
      ),
      (
        <EuiButton
          size="s"
          color="danger"
          iconType="trash"
          onClick={onDeleteClick}
          isDisabled={(canDeleteCalendar === false || mlNodesAvailable === false || itemsSelected === false)}
        >
          Delete
        </EuiButton>
      )
    ],
    box: {
      incremental: true,
    },
    filters: []
  };

  return (
    <React.Fragment>
      <EuiInMemoryTable
        items={calendarsList}
        itemId="calendar_id"
        columns={columns}
        search={search}
        pagination={pagination}
        sorting={sorting}
        loading={loading}
        selection={tableSelection}
        isSelectable={true}
      />
    </React.Fragment>
  );
}

CalendarsListTable.propTypes = {
  calendarsList: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  canCreateCalendar: PropTypes.bool.isRequired,
  canDeleteCalendar: PropTypes.bool.isRequired,
  mlNodesAvailable: PropTypes.bool.isRequired,
  setSelectedCalendarList: PropTypes.func.isRequired,
  itemsSelected: PropTypes.bool.isRequired,
};
