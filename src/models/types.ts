export type TabId = 'overview' | 'lights';

export type CardLayout = 'horizontalLayout' | 'verticalLayout' | 'singleDevice';

export interface DashboardData {
  tabs: Tab[];
}

export interface Tab {
  id: TabId | string;
  title: string;
  cards: CardModel[];
}

export interface CardModel {
  id: string;
  title: string;
  layout: CardLayout;
  items: CardItem[];
}

export type CardItem = DeviceItem | SensorItem;

export interface BaseItem {
  icon: string;
  label: string;
}

export interface DeviceItem extends BaseItem {
  type: 'device';
  state: boolean;
}

export interface SensorItem extends BaseItem {
  type: 'sensor';
  value: SensorValue;
}

export interface SensorValue {
  amount: number;
  unit: string;
}
