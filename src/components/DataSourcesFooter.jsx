import React from 'react';

const defaultSources = [
  { label: 'MNRE', url: 'https://mnre.gov.in' },
  { label: 'PM Surya Ghar Portal', url: 'https://pmsuryaghar.gov.in' },
  { label: 'CEA', url: 'https://cea.nic.in' },
];

const DataSourcesFooter = ({
  title = 'Data Sources and Last Reviewed',
  reviewedDate = 'March 2026',
  note = 'Information is for awareness and planning. Confirm latest eligibility, tariff, and subsidy rules with official portals and your local DISCOM before making a purchase decision.',
  sources = defaultSources,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 sm:p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Last Reviewed: {reviewedDate}</p>

      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
        {sources.map((source) => (
          <li key={source.label}>
            - {source.label}:{' '}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 underline"
            >
              {source.url}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-500 dark:text-gray-400">{note}</p>
    </div>
  );
};

export default DataSourcesFooter;
