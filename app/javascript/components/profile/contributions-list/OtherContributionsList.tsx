import React from 'react'
import { useScrollToTop } from '@/hooks'
import { usePaginatedRequestQuery, type Request } from '@/hooks/request-query'
import { useList } from '@/hooks/use-list'
import { fromNow } from '@/utils/date'
import {
  TrackIcon,
  Reputation,
  GraphicalIcon,
  Pagination,
} from '@/components/common'
import { FetchingBoundary } from '@/components/FetchingBoundary'
import { ResultsZone } from '@/components/ResultsZone'
import type {
  Contribution as ContributionProps,
  PaginatedResult,
} from '@/components/types'

const DEFAULT_ERROR = new Error('Unable to load other contributions')

export const OtherContributionsList = ({
  request: initialRequest,
}: {
  request: Request
}): JSX.Element => {
  const { request, setPage } = useList(initialRequest)
  const { status, resolvedData, latestData, isFetching, error } =
    usePaginatedRequestQuery<
      PaginatedResult<ContributionProps[]>,
      Error | Response
    >([request.endpoint, request.query], request)

  const scrollToTopRef = useScrollToTop<HTMLDivElement>(request.query.page)

  return (
    <ResultsZone isFetching={isFetching}>
      <FetchingBoundary
        error={error}
        status={status}
        defaultError={DEFAULT_ERROR}
      >
        {resolvedData ? (
          <React.Fragment>
            <div className="other" ref={scrollToTopRef}>
              {resolvedData.results.map((contribution) => (
                <Contribution key={contribution.uuid} {...contribution} />
              ))}
            </div>
            <Pagination
              disabled={latestData === undefined}
              current={request.query.page || 1}
              total={resolvedData.meta.totalPages}
              setPage={setPage}
            />
          </React.Fragment>
        ) : null}
      </FetchingBoundary>
    </ResultsZone>
  )
}

const Contribution = ({
  value,
  text,
  iconUrl,
  internalUrl,
  externalUrl,
  createdAt,
  track,
}: ContributionProps): JSX.Element => {
  const url = internalUrl || externalUrl
  const linkIcon = url === internalUrl ? 'chevron-right' : 'external-link'

  return (
    <a href={url} className="reputation-token">
      <img alt="" src={iconUrl} className="c-icon primary-icon" />
      <div className="info">
        <div className="title">{text}</div>
        <div className="extra">
          {track ? (
            <div className="exercise">
              in
              <TrackIcon
                iconUrl={track.iconUrl}
                title={track.title}
                className="primary-icon"
              />
              <div className="name">{track.title}</div>
            </div>
          ) : (
            <div className="generic">Generic</div>
          )}
          <time dateTime={createdAt}>{fromNow(createdAt)}</time>
        </div>
      </div>
      <Reputation value={`+ ${value}`} type="primary" size="small" />
      <GraphicalIcon icon={linkIcon} className="action-button" />
    </a>
  )
}
