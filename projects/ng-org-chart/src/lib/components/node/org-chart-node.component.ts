import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgChartNode } from '../../models/org-chart.models';

@Component({
    selector: 'lib-org-chart-node',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="org-chart-node-content" [class.expanded]="node.expanded">
      <div class="org-chart-node-header" (click)="toggleExpand()">
        @if (node.image) {
          <div class="org-chart-node-avatar">
            <img [src]="node.image" alt="{{ node.name }}">
          </div>
        }
        <div class="org-chart-node-info">
          <div class="org-chart-node-name">{{ node.name }}</div>
          @if (node.title) {
            <div class="org-chart-node-title">{{ node.title }}</div>
          }
        </div>
        @if (hasChildren) {
          <div class="org-chart-node-toggle" [class.expanded]="node.expanded">
            <span>{{ node.expanded ? '−' : '+' }}</span>
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      box-sizing: border-box;
    }
    
    .org-chart-node-content {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .org-chart-node-header {
      padding: 10px;
      display: flex;
      align-items: center;
    }
    
    .org-chart-node-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    
    .org-chart-node-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .org-chart-node-info {
      flex-grow: 1;
    }
    
    .org-chart-node-name {
      font-weight: bold;
      font-size: 14px;
    }
    
    .org-chart-node-title {
      font-size: 12px;
      color: #666;
    }
    
    .org-chart-node-toggle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: transform 0.3s ease;
    }
    
    .org-chart-node-toggle.expanded {
      transform: rotate(180deg);
    }
  `]
})
export class OrgChartNodeComponent {
    @Input() node!: OrgChartNode;
    @Output() expandChange = new EventEmitter<{ node: OrgChartNode, expanded: boolean }>();

    @HostBinding('class')
    get nodeClass() {
        return this.node.cssClass || '';
    }

    get hasChildren(): boolean {
        return !!this.node.children && this.node.children.length > 0;
    }

    toggleExpand(): void {
        if (this.hasChildren) {
            this.node.expanded = !this.node.expanded;
            this.expandChange.emit({ node: this.node, expanded: this.node.expanded });
        }
    }
} 