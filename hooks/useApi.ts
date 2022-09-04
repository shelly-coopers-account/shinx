import useSWR, { SWRConfiguration } from 'swr'

import fetcher from 'lib/fetcher'

type UseApiProps = {
  url: string
  params?: URLSearchParams
  cb?: () => void
  config?: SWRConfiguration
}

export default <P>({ url, params, cb, config }: UseApiProps) => {
  const usp = new URLSearchParams(params)

  usp.sort()
  const qs = usp.toString()

  const { data, error } = useSWR(
    qs !== '' ? `${url}?${qs}` : url,
    cb || fetcher,
    config
  ) as { data: P; error: any }

  return {
    loading: !error && !data,
    data,
    error,
  }
}
