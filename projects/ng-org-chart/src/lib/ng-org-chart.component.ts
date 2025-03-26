import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgChartNode, OrgChartOptions, OrgChartOrientation, OrgChartThemes } from './models/org-chart.models';
import { NgOrgChartService } from './ng-org-chart.service';
import { OrgChartNodeComponent } from './components/node/org-chart-node.component';

@Component({
  selector: 'lib-ng-org-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, OrgChartNodeComponent],
  template: `
    <div class="org-chart-container" 
         [class.vertical]="options.orientation === 'vertical'"
         [class.horizontal]="options.orientation === 'horizontal'"
         [class]="themeClass">
      
      <div class="org-chart-controls" *ngIf="showControls">
        <div class="org-chart-layout-controls">
          <button (click)="setOrientation('vertical')" 
                  [class.active]="options.orientation === 'vertical'">
            Vertical
          </button>
          <button (click)="setOrientation('horizontal')" 
                  [class.active]="options.orientation === 'horizontal'">
            Horizontal
          </button>
        </div>
        
        <div class="org-chart-theme-controls" *ngIf="availableThemes && availableThemes.length > 1">
          <select [(ngModel)]="selectedTheme" (change)="setTheme(selectedTheme)">
            <option *ngFor="let theme of availableThemes" [value]="theme.id">
              {{ theme.name }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="org-chart" [class.collapsed]="collapsed">
        <ng-container *ngIf="chartData && chartData.length > 0">
          <div class="org-chart-tree">
            <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: chartData[0], level: 0 }"></ng-container>
          </div>
        </ng-container>
        
        <div *ngIf="!chartData || chartData.length === 0" class="org-chart-empty">
          No data available
        </div>
      </div>
    </div>
    
    <ng-template #nodeTemplate let-node let-level="level">
      <div class="org-chart-node-wrapper level-{{level}}" [style.padding]="options.nodePadding + 'px'">
        <lib-org-chart-node 
          [node]="node" 
          (expandChange)="onNodeExpandChange($event)">
        </lib-org-chart-node>
        
        <div class="org-chart-children" *ngIf="node.children && node.children.length > 0 && node.expanded"
            [style.margin-top]="options.levelSeparation + 'px'"
            [style.margin-left]="options.orientation === 'horizontal' ? options.levelSeparation + 'px' : '0'"
            [class.horizontal]="options.orientation === 'horizontal'">
          <div class="org-chart-child-wrapper" 
               *ngFor="let child of node.children; let i = index" 
               [style.margin-right]="i < node.children.length - 1 ? options.siblingSeparation + 'px' : '0'">
            <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: child, level: level + 1 }"></ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    .org-chart-container {
      width: 100%;
      overflow: auto;
      padding: 20px;
    }
    
    .org-chart-controls {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      gap: 10px;
    }
    
    .org-chart-layout-controls button, 
    .org-chart-theme-controls select {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .org-chart-layout-controls button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    .org-chart-theme-controls select {
      padding-right: 30px;
    }
    
    .org-chart {
      position: relative;
    }
    
    .org-chart-tree {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    
    .org-chart-node-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    
    .org-chart-children {
      display: flex;
      justify-content: center;
      position: relative;
    }
    
    .org-chart-children.horizontal {
      flex-direction: column;
    }
    
    .org-chart-child-wrapper {
      display: flex;
    }
    
    .org-chart-empty {
      text-align: center;
      padding: 30px;
      font-style: italic;
      color: #999;
    }
    
    /* Theme: Default */
    .org-chart-theme-default {
      --node-bg-color: #fff;
      --node-border-color: #ddd;
      --node-text-color: #333;
      --node-title-color: #666;
    }
    
    /* Theme: Modern */
    .org-chart-theme-modern {
      --node-bg-color: #3498db;
      --node-border-color: #2980b9;
      --node-text-color: #fff;
      --node-title-color: #e0e0e0;
    }
    
    /* Theme: Minimal */
    .org-chart-theme-minimal {
      --node-bg-color: #f8f9fa;
      --node-border-color: #e9ecef;
      --node-text-color: #343a40;
      --node-title-color: #6c757d;
    }
    
    /* Theme: Corporate */
    .org-chart-theme-corporate {
      --node-bg-color: #34495e;
      --node-border-color: #2c3e50;
      --node-text-color: #ecf0f1;
      --node-title-color: #bdc3c7;
    }
  `]
})
export class NgOrgChartComponent implements OnChanges {
  @Input() data: any[] | any = [];
  @Input() options: Partial<OrgChartOptions> = {};
  @Input() showControls = true;
  @Input() collapsed = false;

  @Output() nodeClick = new EventEmitter<OrgChartNode>();
  @Output() nodeExpand = new EventEmitter<OrgChartNode>();
  @Output() nodeCollapse = new EventEmitter<OrgChartNode>();
  @Output() optionsChange = new EventEmitter<OrgChartOptions>();

  chartData: OrgChartNode[] = [];
  availableThemes = OrgChartThemes;

  private _options!: OrgChartOptions;
  private _themeClass = 'org-chart-theme-default';

  selectedTheme: string = 'default';

  constructor(private orgChartService: NgOrgChartService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.processData();
    }

    if (changes['options']) {
      this.initOptions();
    }
  }

  /**
   * Process input data and convert to OrgChartNode format
   */
  private processData(): void {
    if (!this.data) {
      this.chartData = [];
      return;
    }

    this.chartData = this.orgChartService.processData(this.data);
    this.applyOptions();
  }

  /**
   * Initialize and merge options with defaults
   */
  private initOptions(): void {
    this._options = this.orgChartService.getOptions(this.options);
    this.applyOptions();

    // Set theme class and selected theme
    const theme = this.availableThemes.find(t => t.id === this._options.theme);
    this._themeClass = theme ? theme.cssClass : 'org-chart-theme-default';
    this.selectedTheme = this._options.theme || 'default';
  }

  /**
   * Apply options to chart data (e.g., expand/collapse nodes)
   */
  private applyOptions(): void {
    if (!this.chartData || !this._options) return;

    // Apply expandAll option
    if (this._options.expandAll !== undefined) {
      this.expandCollapseAll(this._options.expandAll);
    }
  }

  /**
   * Expand or collapse all nodes
   */
  private expandCollapseAll(expand: boolean): void {
    const processNode = (node: OrgChartNode) => {
      node.expanded = expand;
      if (node.children) {
        node.children.forEach(child => processNode(child));
      }
    };

    this.chartData.forEach(node => processNode(node));
  }

  /**
   * Set orientation (vertical/horizontal)
   */
  setOrientation(orientation: string): void {
    this._options.orientation = orientation as OrgChartOrientation;
    this.optionsChange.emit(this._options);
  }

  /**
   * Set theme
   */
  setTheme(themeId: string): void {
    this._options.theme = themeId;
    const theme = this.availableThemes.find(t => t.id === themeId);
    this._themeClass = theme ? theme.cssClass : 'org-chart-theme-default';
    this.selectedTheme = themeId;
    this.optionsChange.emit(this._options);
  }

  /**
   * Handle node expand/collapse
   */
  onNodeExpandChange(event: { node: OrgChartNode, expanded: boolean }): void {
    if (event.expanded) {
      this.nodeExpand.emit(event.node);
    } else {
      this.nodeCollapse.emit(event.node);
    }
  }

  /**
   * Get theme class
   */
  get themeClass(): string {
    return this._themeClass;
  }

  /**
   * Get current options
   */
  get currentOptions(): OrgChartOptions {
    return this._options;
  }
}
