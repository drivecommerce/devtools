# Drive Commerce DevTools

Capture and view Customizer related requests in devtools.

## Security and Privacy

We understand the concerns about adding browser extensions. To address these, **Drive Commerce DevTools** prioritizes security and privacy by adhering to the following principles:

- **No content scripts:** The extension does not inject scripts into regular web pages.
- **No background scripts:** It avoids background processes running in the browser.
- **Minimal permissions:** 
  - Currently, no permissions are requested.
  - If permissions are needed, they will be limited to reading data from Drive Commerce domains and subdomains:
    - `drivecommerce.com`
    - `drrv.co`
- **No tracking or analytics:** The extension does not include any tracking, analytics, or phone-home functionality.

## Developing in a Local Environment

To streamline development, most of the extension’s features can be previewed locally as a browser page without needing to load the extension via browser settings.

### Start the Development Server

Run the following command to start the local development server: `pnpm serve`

Then, access the desired pages in your browser:

- **DevTools main page:** [http://localhost:3303/devtools/index.html](http://localhost:3303/devtools/index.html)
- **Options page:** [http://localhost:3303/options/index.html](http://localhost:3303/options/index.html)

### Mock Data

The extension includes mock data to facilitate front-end UI development. These mock datasets are loaded via the `DevTools.vue` component and cover the following use cases:

- Recipe example
- Blueprint example
- External data retrieval service
- Moderation endpoint samples
- Data query samples

## Loading the Extension in Your Browser

To load the extension for development, follow these steps (Chrome browser is used as an example):

1. **Build the Extension:** Run the following command to prepare and build the extension files: `pnpm build`

2. **Enable Developer Mode:**  
   - Open the browser’s **Extensions** settings.  
   - Toggle the **Developer Mode** switch in the top-right corner.

3. **Load the Unpacked Extension:**  
   - Click the **Load Unpacked** button.  
   - Select the `/extension` folder in the `drive-devtools` project. This will add the "Drive DevTools" to your installed extensions.

4. **Access the DevTools Panel:**  
   - Right-click any web page in the browser and select **Inspect** to open Chrome DevTools.  
   - Navigate to the **Drive Inspect** tab in the DevTools interface.

5. **Test on a Drive Customizer-Enabled Site:**  
   - Visit a site that supports Drive Customizer.  
   - View the JSON data for the relevant blueprint in the **Drive Inspect** extension panel.
