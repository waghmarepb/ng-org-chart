import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgOrgChartComponent, OrgChartOptions, OrgChartOrientation } from 'ng-org-chart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgOrgChartComponent],
  template: `
    <div class="container">
      <h1>Angular Organization Chart Demo</h1>
      
      <div class="controls">
        <div>
          <label>Data Source:</label>
          <select [(ngModel)]="selectedDataSource" (change)="loadData()">
            <option value="simple">Simple Data</option>
            <option value="large">Large Organization</option>
            <option value="custom">Custom Data</option>
          </select>
        </div>
        
        <div>
          <button (click)="toggleShowControls()">
            {{ showOrgChartControls ? 'Hide Controls' : 'Show Controls' }}
          </button>
        </div>
      </div>
      
      <div class="org-chart-wrapper">
        <lib-ng-org-chart 
          [data]="chartData" 
          [options]="chartOptions"
          [showControls]="showOrgChartControls"
          (nodeExpand)="onNodeExpand($event)"
          (nodeCollapse)="onNodeCollapse($event)"
          (optionsChange)="onOptionsChange($event)">
        </lib-ng-org-chart>
      </div>
      
      <div class="data-display">
        <h3>Current Configuration</h3>
        <pre>{{ chartOptions | json }}</pre>
        
        <h3>Custom Data Input</h3>
        <textarea 
          *ngIf="selectedDataSource === 'custom'"
          [(ngModel)]="customDataInput" 
          rows="10" 
          (blur)="updateCustomData()">
        </textarea>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .controls {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    
    .controls select, .controls button {
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #ddd;
      background-color: white;
      cursor: pointer;
    }
    
    .org-chart-wrapper {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 4px;
    }
    
    .data-display {
      margin-top: 30px;
    }
    
    pre {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      overflow: auto;
    }
    
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  selectedDataSource: string = 'simple';
  chartData: any[] = [];
  chartOptions: OrgChartOptions = {
    orientation: OrgChartOrientation.Vertical,
    theme: 'default',
    nodeWidth: 150,
    nodeHeight: 100,
    nodePadding: 10,
    levelSeparation: 60,
    siblingSeparation: 20,
    expandAll: true
  };

  showOrgChartControls: boolean = true;
  customDataInput: string = '';

  constructor() {
    this.loadData();
  }

  loadData(): void {
    switch (this.selectedDataSource) {
      case 'simple':
        this.loadSimpleData();
        break;
      case 'large':
        this.loadLargeData();
        break;
      case 'custom':
        this.initCustomData();
        break;
      default:
        this.loadSimpleData();
    }
  }

  loadSimpleData(): void {
    this.chartData = [
      {
        id: 1,
        name: 'John Smith',
        title: 'CEO',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        children: [
          {
            id: 2,
            name: 'Sarah Johnson',
            title: 'CTO',
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            children: [
              {
                id: 5,
                name: 'Michael Brown',
                title: 'Senior Developer',
                image: 'https://randomuser.me/api/portraits/men/5.jpg'
              },
              {
                id: 6,
                name: 'Emma Wilson',
                title: 'UX Designer',
                image: 'https://randomuser.me/api/portraits/women/6.jpg'
              }
            ]
          },
          {
            id: 3,
            name: 'James Williams',
            title: 'CFO',
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
          },
          {
            id: 4,
            name: 'Patricia Davis',
            title: 'CMO',
            image: 'https://randomuser.me/api/portraits/women/4.jpg',
            children: [
              {
                id: 7,
                name: 'Robert Miller',
                title: 'Marketing Manager',
                image: 'https://randomuser.me/api/portraits/men/7.jpg'
              }
            ]
          }
        ]
      }
    ];
  }

  loadLargeData(): void {
    this.chartData = [
      {
        id: 1,
        name: 'Executive Team',
        children: [
          {
            id: 2,
            name: 'Product Division',
            children: [
              {
                id: 21, name: 'Development Team', children: [
                  { id: 211, name: 'Frontend' },
                  { id: 212, name: 'Backend' },
                  { id: 213, name: 'Mobile' }
                ]
              },
              { id: 22, name: 'QA Team' },
              { id: 23, name: 'UX Team' }
            ]
          },
          {
            id: 3,
            name: 'Finance Division',
            children: [
              { id: 31, name: 'Accounting' },
              { id: 32, name: 'Investment' }
            ]
          },
          {
            id: 4,
            name: 'HR Division'
          },
          {
            id: 5,
            name: 'Marketing Division',
            children: [
              { id: 51, name: 'Digital Marketing' },
              { id: 52, name: 'Brand Management' },
              { id: 53, name: 'Public Relations' }
            ]
          }
        ]
      }
    ];
  }

  initCustomData(): void {
    if (!this.customDataInput) {
      this.customDataInput = JSON.stringify(this.chartData, null, 2);
    } else {
      this.updateCustomData();
    }
  }

  updateCustomData(): void {
    try {
      this.chartData = JSON.parse(this.customDataInput);
    } catch (error) {
      console.error('Invalid JSON data', error);
      // Keep the current data
    }
  }

  toggleShowControls(): void {
    this.showOrgChartControls = !this.showOrgChartControls;
  }

  onNodeExpand(node: any): void {
    console.log('Node expanded:', node);
  }

  onNodeCollapse(node: any): void {
    console.log('Node collapsed:', node);
  }

  onOptionsChange(options: OrgChartOptions): void {
    this.chartOptions = { ...options };
  }
}
