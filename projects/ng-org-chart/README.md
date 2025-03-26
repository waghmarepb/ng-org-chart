# Angular Organization Chart

A flexible and customizable organization chart library for Angular applications, supporting both vertical and horizontal layouts with multiple design themes.

## Features

- Vertical and horizontal layout options
- Multiple built-in design themes
- Expandable/collapsible nodes
- Flexible data input (JSON or array format)
- Customizable node appearance
- Built with Angular standalone components

## Installation

```bash
npm install @waghmarepb/ng-org-chart
```

## Usage

### Import the module in your component

```typescript
import { Component } from "@angular/core";
import { NgOrgChartComponent, OrgChartOptions, OrgChartOrientation } from "@waghmarepb/ng-org-chart";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgOrgChartComponent],
  template: ` <lib-ng-org-chart [data]="chartData" [options]="chartOptions" [showControls]="true" (nodeExpand)="onNodeExpand($event)" (nodeCollapse)="onNodeCollapse($event)"> </lib-ng-org-chart> `,
})
export class AppComponent {
  chartData = [
    {
      id: 1,
      name: "John Smith",
      title: "CEO",
      children: [
        {
          id: 2,
          name: "Sarah Johnson",
          title: "CTO",
          children: [
            { id: 5, name: "Michael Brown", title: "Senior Developer" },
            { id: 6, name: "Emma Wilson", title: "UX Designer" },
          ],
        },
        { id: 3, name: "James Williams", title: "CFO" },
      ],
    },
  ];

  chartOptions: OrgChartOptions = {
    orientation: OrgChartOrientation.Vertical,
    theme: "default",
    nodeWidth: 150,
    nodeHeight: 100,
    nodePadding: 10,
    levelSeparation: 60,
    siblingSeparation: 20,
    expandAll: true,
  };

  onNodeExpand(node: any): void {
    console.log("Node expanded:", node);
  }

  onNodeCollapse(node: any): void {
    console.log("Node collapsed:", node);
  }
}
```

## Data Format

The library accepts data in the following format:

```typescript
interface OrgChartNode {
  id: string | number; // Unique identifier for the node
  name: string; // Name/label to display
  title?: string; // Optional title/position
  image?: string; // Optional image URL
  children?: OrgChartNode[]; // Optional child nodes
  cssClass?: string; // Optional CSS class for custom styling
  expanded?: boolean; // Optional expanded state (default: true)
}
```

The library will also try to normalize other common organization chart data formats, supporting alternative property names like `reports` or `subordinates` for children.

## Configuration Options

The following options can be configured:

```typescript
interface OrgChartOptions {
  orientation?: "vertical" | "horizontal"; // Chart layout direction
  theme?: string; // Theme name: 'default', 'modern', 'minimal', 'corporate'
  nodeWidth?: number; // Width of nodes
  nodeHeight?: number; // Height of nodes
  nodePadding?: number; // Padding around nodes
  levelSeparation?: number; // Vertical space between levels
  siblingSeparation?: number; // Horizontal space between siblings
  expandAll?: boolean; // Whether to expand all nodes initially
}
```

## Available Themes

The library comes with the following built-in themes:

- `default` - Clean, professional appearance with white background
- `modern` - Blue theme with modern styling
- `minimal` - Minimalist design with subtle colors
- `corporate` - Dark corporate style with professional appearance

## Events

The component emits the following events:

- `nodeExpand` - Emitted when a node is expanded
- `nodeCollapse` - Emitted when a node is collapsed
- `nodeClick` - Emitted when a node is clicked
- `optionsChange` - Emitted when options are changed via the UI controls

## Custom Styling

You can add custom styling to individual nodes by setting the `cssClass` property in your node data. This class will be applied to the node element.

## License

MIT
