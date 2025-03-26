import { Injectable } from '@angular/core';
import { OrgChartNode, OrgChartOptions, OrgChartOrientation, OrgChartThemes } from './models/org-chart.models';

@Injectable({
  providedIn: 'root'
})
export class NgOrgChartService {
  private defaultOptions: OrgChartOptions = {
    orientation: OrgChartOrientation.Vertical,
    theme: 'default',
    nodeWidth: 150,
    nodeHeight: 100,
    nodePadding: 10,
    levelSeparation: 60,
    siblingSeparation: 20,
    expandAll: true
  };

  constructor() { }

  /**
   * Process and normalize input data to OrgChartNode format
   */
  processData(data: any[] | any): OrgChartNode[] {
    // If data is a single object, wrap it in an array
    const dataArray = Array.isArray(data) ? data : [data];

    // Map data to OrgChartNode format
    return this.mapToOrgChartNodes(dataArray);
  }

  /**
   * Map input data to OrgChartNode format recursively
   */
  private mapToOrgChartNodes(data: any[]): OrgChartNode[] {
    return data.map(item => this.mapSingleNode(item));
  }

  /**
   * Map a single item to OrgChartNode format
   */
  private mapSingleNode(item: any): OrgChartNode {
    // Create base node with required fields
    const node: OrgChartNode = {
      id: item.id || Math.random().toString(36).substr(2, 9),
      name: item.name || item.title || item.label || 'Unknown',
      expanded: true
    };

    // Add optional fields if they exist
    if (item.title) node.title = item.title;
    if (item.image) node.image = item.image;
    if (item.cssClass) node.cssClass = item.cssClass;
    if (item.expanded !== undefined) node.expanded = item.expanded;

    // Process children recursively
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      node.children = this.mapToOrgChartNodes(item.children);
    } else if (item.reports && Array.isArray(item.reports) && item.reports.length > 0) {
      // Support alternate property names for children
      node.children = this.mapToOrgChartNodes(item.reports);
    } else if (item.subordinates && Array.isArray(item.subordinates) && item.subordinates.length > 0) {
      node.children = this.mapToOrgChartNodes(item.subordinates);
    }

    return node;
  }

  /**
   * Get merged options (user options + defaults)
   */
  getOptions(options?: OrgChartOptions): OrgChartOptions {
    return { ...this.defaultOptions, ...options };
  }

  /**
   * Get available themes
   */
  getThemes() {
    return OrgChartThemes;
  }
}
