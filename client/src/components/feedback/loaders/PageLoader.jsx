import BrandLogo from '../../common/BrandLogo'
import Spinner from './Spinner'

export default function PageLoader() {
  return <div className="page-loader" aria-busy="true"><BrandLogo showTagline /><Spinner size="md" label="Loading page" /></div>
}
