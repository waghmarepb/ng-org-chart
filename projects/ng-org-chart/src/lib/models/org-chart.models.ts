export interface OrgChartNode {
    id: string | number;
    name: string;
    title?: string;
    image?: string;
    children?: OrgChartNode[];
    // Additional properties for styling
    cssClass?: string;
    expanded?: boolean;
}

export enum OrgChartOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal'
}

export interface OrgChartTheme {
    id: string;
    name: string;
    cssClass: string;
}

export const OrgChartThemes: OrgChartTheme[] = [
    { id: 'default', name: 'Default', cssClass: 'org-chart-theme-default' },
    { id: 'modern', name: 'Modern', cssClass: 'org-chart-theme-modern' },
    { id: 'minimal', name: 'Minimal', cssClass: 'org-chart-theme-minimal' },
    { id: 'corporate', name: 'Corporate', cssClass: 'org-chart-theme-corporate' }
];

export interface OrgChartOptions {
    orientation?: OrgChartOrientation;
    theme?: string;
    nodeWidth?: number;
    nodeHeight?: number;
    nodePadding?: number;
    levelSeparation?: number;
    siblingSeparation?: number;
    expandAll?: boolean;
} 