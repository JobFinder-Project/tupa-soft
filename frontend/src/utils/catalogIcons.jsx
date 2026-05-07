import {
  ArchiveIcon,
  AvatarIcon,
  BackpackIcon,
  BarChartIcon,
  CheckCircledIcon,
  GlobeIcon,
  HamburgerMenuIcon,
  LightningBoltIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

export const CATEGORY_ICON_COMPONENTS = {
  supermercado: BackpackIcon,
  calculadoras: ReaderIcon,
  estoque: ArchiveIcon,
  financeiro: BarChartIcon,
  rh: AvatarIcon,
  restaurante: HamburgerMenuIcon,
}

export function getCategoryIcon(categoryId) {
  return CATEGORY_ICON_COMPONENTS[categoryId] ?? GlobeIcon
}

export const PAGE_ICON_COMPONENTS = {
  brand: LightningBoltIcon,
  verified: CheckCircledIcon,
  support: GlobeIcon,
  stepSearch: ReaderIcon,
  stepPlan: BarChartIcon,
  stepRocket: RocketIcon,
  user: AvatarIcon,
}
