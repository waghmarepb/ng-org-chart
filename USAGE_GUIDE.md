# Using @waghmarepb/ng-org-chart

This guide shows how to use the Angular Organization Chart library in your Angular projects.

## Installation

Install the package using npm:

```bash
npm install @waghmarepb/ng-org-chart
```

## Basic Usage

1. Import the component in your module or standalone component:

```typescript
// In a standalone component
import { NgOrgChartComponent, OrgChartOptions, OrgChartOrientation } from '@waghmarepb/ng-org-chart';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [NgOrgChartComponent],
  // ...
})
```

2. Use the component in your template and provide your data:

```html
<lib-ng-org-chart [data]="chartData" [options]="chartOptions" [showControls]="true" (nodeExpand)="onNodeExpand($event)" (nodeCollapse)="onNodeCollapse($event)"> </lib-ng-org-chart>
```

3. Define your data and options in the component class:

```typescript
export class MyComponent {
  chartData = [
    {
      id: 1,
      name: "CEO",
      title: "Chief Executive Officer",
      children: [
        {
          id: 2,
          name: "CTO",
          title: "Chief Technology Officer",
          children: [
            { id: 4, name: "Dev Lead", title: "Development Team Lead" },
            { id: 5, name: "QA Lead", title: "Quality Assurance Lead" },
          ],
        },
        {
          id: 3,
          name: "CFO",
          title: "Chief Financial Officer",
        },
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

## Customization

### Changing the Orientation

You can choose between vertical and horizontal layouts:

```typescript
// For vertical layout (default)
chartOptions: OrgChartOptions = {
  orientation: OrgChartOrientation.Vertical,
  // ...
};

// For horizontal layout
chartOptions: OrgChartOptions = {
  orientation: OrgChartOrientation.Horizontal,
  // ...
};
```

### Changing the Theme

The library provides four built-in themes:

```typescript
// Choose one of the following themes
chartOptions: OrgChartOptions = {
  theme: "default", // Clean, professional appearance
  // theme: 'modern',   // Blue theme with modern styling
  // theme: 'minimal',  // Minimalist design with subtle colors
  // theme: 'corporate', // Dark corporate style
  // ...
};
```

### Custom Styling

You can add custom styling to individual nodes by setting the `cssClass` property:

```typescript
chartData = [
  {
    id: 1,
    name: "CEO",
    cssClass: "my-custom-node-class",
    // ...
  },
];
```

Then define your CSS class in your global styles:

```css
.my-custom-node-class {
  /* Your custom styles */
  background-color: #ffebcd;
  border: 2px solid #ffa500;
}
```

## Advanced Usage

### Programmatically Control Expansion

You can programmatically expand or collapse nodes by manipulating the `expanded` property on your data:

```typescript
// Collapse all nodes
toggleCollapseAll() {
  const updateNodes = (nodes: any[]) => {
    for (const node of nodes) {
      node.expanded = false;
      if (node.children) {
        updateNodes(node.children);
      }
    }
  };

  updateNodes(this.chartData);
  // Force refresh by creating a new array reference
  this.chartData = [...this.chartData];
}
```

### Support for Large Organizations

For large organization charts, you can implement lazy loading of nodes when expanded:

```typescript
onNodeExpand(node: any): void {
  // Check if this is a placeholder node that needs to load children
  if (node.loadChildren && !node.childrenLoaded) {
    // Fetch children from an API or other data source
    this.dataService.getChildren(node.id).subscribe(children => {
      node.children = children;
      node.childrenLoaded = true;
      // Force refresh
      this.chartData = [...this.chartData];
    });
  }
}
```

## Troubleshooting

### Common Issues

1. **Component not found error**:
   Make sure you've imported the `NgOrgChartComponent` in your component's imports.

2. **Styling issues**:
   If the chart doesn't look right, check if your global styles might be interfering with the component's styles.

3. **Data not displaying**:
   Ensure your data structure follows the required format with at least `id` and `name` properties.
