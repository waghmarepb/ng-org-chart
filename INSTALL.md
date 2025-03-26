# Installing the Angular Organization Chart Library

Follow these steps to add the organization chart library to your Angular project.

## Prerequisites

- Angular project (Angular 14 or higher recommended)
- Node.js and npm installed

## Installation Steps

1. **Install the library**

   ```bash
   npm install @waghmarepb/ng-org-chart
   ```

2. **Import in your application**

   For standalone components (Angular 14+):

   ```typescript
   import { NgOrgChartComponent } from '@waghmarepb/ng-org-chart';

   @Component({
     // ...
     imports: [NgOrgChartComponent],
     // ...
   })
   ```

3. **Add to your template**

   ```html
   <lib-ng-org-chart [data]="yourData" [options]="yourOptions"></lib-ng-org-chart>
   ```

4. **Prepare your data**

   ```typescript
   yourData = [
     {
       id: 1,
       name: "CEO",
       children: [
         { id: 2, name: "CTO" },
         { id: 3, name: "CFO" },
       ],
     },
   ];

   yourOptions = {
     orientation: "vertical",
     theme: "default",
   };
   ```

## Quick Start Command

You can use the following command to quickly set up a new Angular project with the org chart library:

```bash
# Create a new Angular project
ng new my-org-chart-app --standalone

# Navigate to project directory
cd my-org-chart-app

# Install the organization chart library
npm install @waghmarepb/ng-org-chart

# Start the development server
ng serve
```

## Troubleshooting

If you encounter any issues installing the package, try the following:

1. Clear npm cache:

   ```bash
   npm cache clean --force
   ```

2. Update npm:

   ```bash
   npm install -g npm@latest
   ```

3. Try with the `--legacy-peer-deps` flag:
   ```bash
   npm install @waghmarepb/ng-org-chart --legacy-peer-deps
   ```

## Getting Help

If you need assistance, please:

1. Check the documentation in the project's README
2. Open an issue on the GitHub repository
3. Contact the package maintainer
