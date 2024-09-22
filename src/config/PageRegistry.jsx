class PageRegistry {
  constructor() {
    this.pages = {};
  }

  // Store both the component and its access information
  registerPage(path, pageComponent) {
    if (!pageComponent.getAccessInfo) {
      throw new Error(`Page at path ${path} must implement getAccessInfo.`);
    }

    // Store both the component and the access info for the page
    this.pages[path] = {
      component: pageComponent,
      accessInfo: pageComponent.getAccessInfo(),
    };
  }

  getPageAccessInfo(path) {
    return this.pages[path]?.accessInfo;
  }

  getPageComponent(path) {
    return this.pages[path]?.component;
  }

  getAllPages() {
    return Object.keys(this.pages).map((path) => ({
      path,
      component: this.getPageComponent(path),
      accessInfo: this.getPageAccessInfo(path),
    }));
  }
}

const instance = new PageRegistry();
export default instance;
