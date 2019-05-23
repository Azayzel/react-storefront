const data = {
  ActionButton: {
    id: 'ActionButton',
    filename: 'ActionButton',
    importPath: 'ActionButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Button from '@material-ui/core/Button'\nimport PropTypes from 'prop-types'\nimport Typography from '@material-ui/core/Typography'\n\nexport const styles = theme => ({\n  raised: {\n    boxShadow: 'none',\n    backgroundColor: '#F4F2F1'\n  },\n  label: {\n    justifyContent: 'space-between',\n    alignItems: 'baseline',\n    textTransform: 'none'\n  },\n  caption: {\n    textTransform: 'none',\n    fontWeight: 'bold'\n  },\n  value: {\n    color: theme.palette.text.primary,\n    whiteSpace: 'nowrap',\n    textOverflow: 'ellipses',\n    marginLeft: '10px'\n  }\n})\n\n/**\n * This button class displays a label and value\n */\nfunction ActionButton({ label, value, children, classes, ...props }) {\n  const { caption: captionClass, value: valueClass, ...otherClasses } = classes\n\n  return (\n    <Button variant=\"contained\" classes={otherClasses} {...props}>\n      <Typography variant=\"button\" className={captionClass}>\n        {label}\n      </Typography>\n      <Typography variant=\"caption\" className={valueClass}>\n        {value}\n      </Typography>\n    </Button>\n  )\n}\n\nActionButton.propTypes = {\n  /**\n   * The label to display on the left side of the button\n   */\n  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n  /**\n   * The value to display on the right side of the button\n   */\n  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element])\n}\n\nexport default withStyles(styles, { name: 'RSFActionButton' })(ActionButton)\n",
    description: 'This button class displays a label and value',
    displayName: 'ActionButton',
    methods: [],
    props: [
      {
        name: 'label',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'The label to display on the left side of the button'
        }
      },
      {
        name: 'value',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'The value to display on the right side of the button'
        }
      }
    ],
    styles: { classes: ['raised', 'label', 'caption', 'value'], name: 'RSFActionButton' }
  },
  AddToCartButton: {
    id: 'AddToCartButton',
    filename: 'AddToCartButton',
    importPath: 'AddToCartButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport PropTypes from 'prop-types'\nimport { inject, observer } from 'mobx-react'\nimport classnames from 'classnames'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Button from '@material-ui/core/Button'\nimport Snackbar from '@material-ui/core/Snackbar'\nimport IconButton from '@material-ui/core/IconButton'\nimport CloseIcon from '@material-ui/icons/Close'\nimport Track from './Track'\nimport Link from './Link'\n\n/**\n * A button that when clicked adds the specified product to the cart\n */\nexport const styles = theme => ({\n  root: {},\n  docked: {\n    fontSize: theme.typography.subheading.fontSize,\n    padding: `${theme.margins.container}px`,\n    position: 'fixed',\n    left: 0,\n    bottom: 0,\n    width: '100%',\n    zIndex: 1,\n    borderRadius: '0'\n  },\n  confirmation: {\n    padding: '2px 0'\n  },\n  cartLink: {\n    color: 'white'\n  }\n})\n\n@withStyles(styles, { name: 'RSFAddToCartButton' })\n@inject(({ app, ampFormId }) => ({ cart: app.cart, ampFormId }))\n@observer\nexport default class AddToCartButton extends Component {\n  static propTypes = {\n    /**\n     * The product to add to the cart\n     */\n    product: PropTypes.object,\n\n    /**\n     * The URL for the cart page. Defaults to '/cart'.\n     */\n    cartURL: PropTypes.string,\n\n    /**\n     * The text for the cart link.  Defaults to \"View My Cart\".\n     */\n    cartLinkText: PropTypes.string,\n\n    /**\n     * Set to true to dock the button at the bottom of the viewport so that it is always visible\n     */\n    docked: PropTypes.bool,\n\n    /**\n     * A message to display when an item is added to the cart.\n     * Could be a string or react component\n     */\n    confirmation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),\n\n    /**\n     * Props to be applied to the Snackbar element in which the confirmation message is displayed.\n     */\n    snackbarProps: PropTypes.object\n  }\n\n  static defaultProps = {\n    docked: false,\n    snackbarProps: {},\n    cartURL: '/cart',\n    cartLinkText: 'View My Cart'\n  }\n\n  state = {\n    messageOpen: false\n  }\n\n  render() {\n    const {\n      product,\n      ampFormId,\n      children,\n      classes,\n      className,\n      cart,\n      docked,\n      confirmation,\n      snackbarProps,\n      cartURL,\n      cartLinkText,\n      ...other\n    } = this.props\n\n    return (\n      <Fragment>\n        <Track event=\"addedToCart\" product={product}>\n          <Button\n            key=\"button\"\n            variant=\"contained\"\n            color=\"secondary\"\n            size=\"large\"\n            {...other}\n            on={`tap:${ampFormId}.submit`}\n            onClick={this.onClick}\n            classes={{ root: classes.root }}\n            className={classnames(className, { [classes.docked]: docked })}\n          >\n            {children || 'Add to Cart'}\n          </Button>\n        </Track>\n        <Snackbar\n          key=\"confirmation\"\n          open={this.state.messageOpen}\n          autoHideDuration={3000}\n          onClose={this.handleClose}\n          message={<div className={classes.confirmation}>{confirmation}</div>}\n          action={[\n            <Link to={cartURL} className={classes.cartLink}>\n              {cartLinkText}\n            </Link>,\n            <IconButton\n              key=\"close\"\n              aria-label=\"Close\"\n              color=\"inherit\"\n              className={classes.close}\n              onClick={this.handleClose}\n            >\n              <CloseIcon />\n            </IconButton>\n          ]}\n          {...snackbarProps}\n        />\n      </Fragment>\n    )\n  }\n\n  handleClose = (event, reason) => {\n    if (reason === 'clickaway') return\n    this.setState({ messageOpen: false })\n  }\n\n  onClick = e => {\n    const { onClick } = this.props\n\n    if (onClick) {\n      onClick(e)\n    }\n\n    if (!e.defaultPrevented) {\n      if (this.props.confirmation) {\n        this.setState({ messageOpen: true })\n      }\n      this.props.cart.add(this.props.product)\n    }\n  }\n}\n",
    description: '',
    displayName: 'AddToCartButton',
    methods: [
      {
        name: 'handleClose',
        docblock: null,
        modifiers: [],
        params: [{ name: 'event', type: null }, { name: 'reason', type: null }],
        returns: null
      },
      {
        name: 'onClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'product',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'The product to add to the cart'
        }
      },
      {
        name: 'cartURL',
        props: {
          type: { name: 'string' },
          required: false,
          description: "The URL for the cart page. Defaults to '/cart'.",
          defaultValue: { value: "'/cart'", computed: false }
        }
      },
      {
        name: 'cartLinkText',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The text for the cart link.  Defaults to "View My Cart".',
          defaultValue: { value: "'View My Cart'", computed: false }
        }
      },
      {
        name: 'docked',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to dock the button at the bottom of the viewport so that it is always visible',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'confirmation',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'object' }] },
          required: false,
          description:
            'A message to display when an item is added to the cart.\nCould be a string or react component'
        }
      },
      {
        name: 'snackbarProps',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            'Props to be applied to the Snackbar element in which the confirmation message is displayed.',
          defaultValue: { value: '{}', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'docked', 'confirmation', 'cartLink'], name: 'RSFAddToCartButton' }
  },
  AnalyticsProvider: {
    id: 'AnalyticsProvider',
    filename: 'AnalyticsProvider',
    importPath: 'AnalyticsProvider',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport analytics, { configureAnalytics } from './analytics'\nimport { Provider, inject } from 'mobx-react'\n\n/**\n * Use this component to register your analytics targets.\n *\n * import AnalyticsProvider from 'react-storefront/AnalyticsProvider'\n * import GoogleAnalyticsTarget from 'react-storefront-extensions/GoogleAnalyticsTarget'\n *\n * Example:\n *\n * ```\n *  <AnalyticsProvider\n *    targets={() => [\n *      new GoogleAnalyticsTarget({\n *        trackingID: 'ABC123'\n *      })\n *    ])}\n *  >\n *    <App/>\n *  </AnalyticsProvider>\n * ```\n *\n * Components that are decendents of AnalyticsProvider can use `@inject('analytics')` to get access to\n * an object which can be used to broadcase analytics events to targets:\n *\n * ```\n *  import React, { Component } from 'react'\n *  import Button from '@material-ui/core/Button'\n *  import { inject } from 'mobx-react'\n *\n *  @inject('analytics')\n *  class MyComponent extends Component {\n *\n *    render() {\n *      return (\n *        <Button onClick={this.fireAnalyticsEvent}>Click Me</Button>\n *      )\n *    }\n *\n *    // This will call the someEvent() method on all configured analytics targets.\n *    fireAnalyticsEvent = () => {\n *      const eventData = { foo: 'bar' }\n *      this.props.analytics.fire('someEvent', eventData) // analytics prop is provided by the @inject('analytics') decorator.\n *    }\n *\n *  }\n * ```\n */\n@inject(({ app, history }) => ({ amp: app && app.amp, history }))\nexport default class AnalyticsProvider extends Component {\n  static propTypes = {\n    /**\n     * Function which should return desired analytics targets to configure.\n     */\n    targets: PropTypes.func.isRequired\n  }\n\n  constructor(props) {\n    super(props)\n    // Configure analytics for server side AMP rendering\n    if (props.targets && props.amp) {\n      configureAnalytics(...props.targets(false))\n    }\n  }\n\n  componentDidMount() {\n    if (this.props.targets) {\n      const targets = this.props.targets()\n      configureAnalytics(...targets)\n\n      for (let target of targets) {\n        if (typeof target.setHistory === 'function') {\n          target.setHistory(this.props.history)\n        }\n      }\n    }\n  }\n\n  render() {\n    return <Provider analytics={analytics}>{this.props.children}</Provider>\n  }\n}\n",
    description:
      "Use this component to register your analytics targets.\n\nimport AnalyticsProvider from 'react-storefront/AnalyticsProvider'\nimport GoogleAnalyticsTarget from 'react-storefront-extensions/GoogleAnalyticsTarget'\n\nExample:\n\n```\n <AnalyticsProvider\n   targets={() => [\n     new GoogleAnalyticsTarget({\n       trackingID: 'ABC123'\n     })\n   ])}\n >\n   <App/>\n </AnalyticsProvider>\n```\n\nComponents that are decendents of AnalyticsProvider can use `@inject('analytics')` to get access to\nan object which can be used to broadcase analytics events to targets:\n\n```\n import React, { Component } from 'react'\n import Button from '@material-ui/core/Button'\n import { inject } from 'mobx-react'\n\n @inject('analytics')\n class MyComponent extends Component {\n\n   render() {\n     return (\n       <Button onClick={this.fireAnalyticsEvent}>Click Me</Button>\n     )\n   }\n\n   // This will call the someEvent() method on all configured analytics targets.\n   fireAnalyticsEvent = () => {\n     const eventData = { foo: 'bar' }\n     this.props.analytics.fire('someEvent', eventData) // analytics prop is provided by the @inject('analytics') decorator.\n   }\n\n }\n```",
    displayName: 'AnalyticsProvider',
    methods: [],
    props: [
      {
        name: 'targets',
        props: {
          type: { name: 'func' },
          required: true,
          description: 'Function which should return desired analytics targets to configure.'
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  AppBar: {
    id: 'AppBar',
    filename: 'AppBar',
    importPath: 'AppBar',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\nimport throttle from 'lodash/throttle'\nimport Toolbar from '@material-ui/core/Toolbar'\nimport { observer, inject } from 'mobx-react'\nimport Hidden from '@material-ui/core/Hidden'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport ToolbarButton from './ToolbarButton'\nimport MenuIcon from './MenuIcon'\n\nexport const styles = theme => ({\n  root: {\n    boxSizing: 'content-box',\n    position: 'relative',\n    zIndex: theme.zIndex.modal + 10\n  },\n\n  withAmp: {\n    zIndex: theme.zIndex.amp.modal + 1\n  },\n\n  offline: {\n    textAlign: 'center',\n    backgroundColor: '#f34c4c',\n    color: 'white'\n  },\n\n  toolBar: {\n    height: theme.headerHeight || '64px',\n    padding: `0 7px`,\n    maxWidth: theme.maxWidth,\n    flex: 1\n  },\n\n  wrap: {\n    borderBottom: `1px solid ${theme.palette.divider}`,\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    backgroundColor: theme.palette.background.paper,\n    zIndex: theme.zIndex.modal + 10,\n    display: 'flex',\n    justifyContent: 'center'\n  },\n\n  stuck: {\n    transform: 'translateY(0)'\n  },\n\n  unstuck: {\n    transform: 'translateY(-100%)'\n  },\n\n  animate: {\n    transition: 'transform .15s ease-in'\n  },\n\n  hidden: {\n    position: 'fixed',\n    zIndex: theme.zIndex.modal + 10,\n    boxShadow: theme.shadows[2],\n    top: 0,\n    left: 0,\n    right: 0\n  },\n\n  menuOpen: {\n    boxShadow: 'none'\n  },\n\n  link: {\n    textDecoration: 'none'\n  }\n})\n\n/**\n * A header that auto hides when the user scrolls down and auto shows when the user\n * scrolls up. A hamburger button that controls the menu is automatically displayed on\n * the left side of the header.  Children are placed directly to the right of the menu\n * button.\n */\n@inject(({ app }) => ({ menu: app.menu, amp: app.amp, offline: app.offline }))\n@withStyles(styles, { name: 'RSFAppBar' })\n@observer\nexport default class Header extends Component {\n  state = {\n    stuck: false,\n    hidden: false,\n    animate: false\n  }\n\n  static propTypes = {\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * A component for the menu icon.\n     */\n    MenuIcon: PropTypes.func,\n\n    /**\n     * Additional props for the menu icon\n     */\n    menuIconProps: PropTypes.object,\n\n    /**\n     * Sets the alignment of the menu icon. \"right\" or \"left\".\n     */\n    menuAlign: PropTypes.oneOf(['left', 'right']),\n\n    /**\n     * String or Element to render within the offline warning container at the top of the app\n     */\n    offlineWarning: PropTypes.oneOfType([PropTypes.string, PropTypes.element])\n  }\n\n  static defaultProps = {\n    MenuIcon,\n    menuIconProps: {},\n    menuAlign: 'left',\n    offlineWarning: 'Your device lost its internet connection.'\n  }\n\n  render() {\n    const {\n      MenuIcon,\n      classes,\n      children,\n      fixed,\n      menu,\n      amp,\n      menuAlign,\n      menuIconProps,\n      offline,\n      offlineWarning\n    } = this.props\n    const items = React.Children.toArray(children)\n\n    const menuButton = (\n      <Hidden mdUp implementation=\"css\" key=\"menuButton\">\n        <a\n          on=\"tap:AMP.setState({ menuOpen: !menuOpen, list: '@' }),moov_menu.toggle\"\n          className={classes.link}\n        >\n          <ToolbarButton\n            aria-label=\"Menu\"\n            color=\"inherit\"\n            onClick={this.onMenuButtonClick}\n            icon={<MenuIcon open={menu.open} {...menuIconProps} />}\n          />\n        </a>\n      </Hidden>\n    )\n\n    if (menuAlign === 'right') {\n      items.push(menuButton)\n    } else {\n      items.unshift(menuButton)\n    }\n\n    return (\n      <div>\n        {offline && <div className={classes.offline}>{offlineWarning}</div>}\n        <div className={classnames({ [classes.root]: true, [classes.withAmp]: amp })}>\n          <div\n            className={classnames({\n              [classes.wrap]: true,\n              [classes.fixed]: fixed,\n              [classes.hidden]: this.state.hidden || menu.open,\n              [classes.stuck]: (this.state.hidden && this.state.stuck) || menu.open,\n              [classes.unstuck]: this.state.hidden && !this.state.stuck,\n              [classes.animate]: this.state.animate,\n              [classes.menuOpen]: menu.open\n            })}\n          >\n            <Toolbar disableGutters classes={{ root: classes.toolBar }}>\n              {items}\n            </Toolbar>\n          </div>\n        </div>\n      </div>\n    )\n  }\n\n  componentDidMount() {\n    window.addEventListener('scroll', this.onScroll, { passive: true })\n  }\n\n  componentWillUnmount() {\n    window.removeEventListener('scroll', this.onScroll, { passive: true })\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (!prevState.hidden && this.state.hidden) {\n      setTimeout(() => this.setState({ animate: true }), 100)\n    }\n  }\n\n  onMenuButtonClick = () => {\n    this.props.menu.toggle()\n  }\n\n  onScroll = () => {\n    const height = 64,\n      { scrollY } = window,\n      { lastScrollY } = this\n    const { menu } = this.props\n\n    if (this.state.hidden) {\n      if (scrollY <= 0) {\n        this.setState({ hidden: false, stuck: false, animate: false })\n      }\n    } else {\n      if (scrollY > height && !menu.open) {\n        this.setState({ hidden: true })\n      }\n    }\n\n    const unstickBufferZone = 15\n\n    if (this.throttledScrollY > scrollY + unstickBufferZone && !this.state.stuck) {\n      this.unstickAt = scrollY + unstickBufferZone\n      this.setState({ stuck: true })\n    } else if (scrollY > this.unstickAt && this.state.stuck && !menu.open) {\n      this.setState({ stuck: false })\n      delete this.unstickAt\n    }\n\n    if (this.lastScrollY > scrollY && this.state.stuck) {\n      this.unstickAt = scrollY + unstickBufferZone\n    }\n\n    this.lastScrollY = scrollY\n    this.sampleScrollSpeed()\n  }\n\n  sampleScrollSpeed = throttle(() => (this.throttledScrollY = window.scrollY), 100)\n}\n",
    description:
      'A header that auto hides when the user scrolls down and auto shows when the user\nscrolls up. A hamburger button that controls the menu is automatically displayed on\nthe left side of the header.  Children are placed directly to the right of the menu\nbutton.',
    displayName: 'Header',
    methods: [
      { name: 'onMenuButtonClick', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'onScroll', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'MenuIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'A component for the menu icon.',
          defaultValue: { value: 'MenuIcon', computed: true }
        }
      },
      {
        name: 'menuIconProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Additional props for the menu icon',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'menuAlign',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'left'", computed: false }, { value: "'right'", computed: false }]
          },
          required: false,
          description: 'Sets the alignment of the menu icon. "right" or "left".',
          defaultValue: { value: "'left'", computed: false }
        }
      },
      {
        name: 'offlineWarning',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description:
            'String or Element to render within the offline warning container at the top of the app',
          defaultValue: { value: "'Your device lost its internet connection.'", computed: false }
        }
      }
    ],
    styles: {
      classes: [
        'root',
        'withAmp',
        'offline',
        'toolBar',
        'wrap',
        'stuck',
        'unstuck',
        'animate',
        'hidden',
        'menuOpen',
        'link'
      ],
      name: 'RSFAppBar'
    }
  },
  BackNav: {
    id: 'BackNav',
    filename: 'BackNav',
    importPath: 'BackNav',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport get from 'lodash/get'\nimport ArrowLeft from '@material-ui/icons/KeyboardArrowLeft'\nimport ListViewIcon from '@material-ui/icons/ViewAgenda'\nimport GridViewIcon from '@material-ui/icons/BorderAll'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Typography from '@material-ui/core/Typography'\nimport { inject, observer } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\nimport { LAYOUT_LIST, LAYOUT_GRID } from './model/SearchResultsModelBase'\nimport Paper from '@material-ui/core/Paper'\n\n/**\n * A header that allows the user to navigate back.  When a searchResults prop is provided,\n * this component also allows the user to switch between grid and list views.\n */\nexport const styles = theme => ({\n  root: {\n    padding: '6px 86px',\n    position: 'relative',\n    display: 'flex',\n    justifyContent: 'center',\n    alignItems: 'center',\n    borderTop: `1px solid ${theme.palette.divider}`,\n    zIndex: theme.zIndex.appBar - 1,\n\n    '& a': {\n      color: theme.palette.text.primary,\n      textDecoration: 'none'\n    }\n  },\n  label: {\n    fontWeight: 'bold',\n    fontSize: '18px',\n    display: 'block',\n    textAlign: 'center',\n    textTransform: 'uppercase'\n  },\n  backButtonWrapper: {\n    position: 'absolute',\n    top: 0,\n    left: '5px',\n    height: '41px',\n    display: 'flex',\n    alignItems: 'center'\n  },\n  switchButtonsWrapper: {\n    position: 'absolute',\n    display: 'flex',\n    alignItems: 'center',\n    top: 0,\n    right: '10px',\n    height: '41px'\n  },\n  switchButton: {\n    marginLeft: '5px',\n    alignItems: 'center',\n    display: 'flex',\n    padding: '3px',\n    borderRadius: '50%'\n  },\n  selectedSwitchButton: {\n    backgroundColor: '#F4F2F1'\n  }\n})\n\n@withStyles(styles, { name: 'RSFBackNav' })\n@inject('history')\n@observer\nexport default class BackNav extends Component {\n  static propTypes = {\n    /**\n     * The text to display representing the previous location.\n     */\n    text: PropTypes.string.isRequired,\n\n    /**\n     * The url to navigate to when clicked.  If omitted, this component will navigate back in the history when clicked.\n     */\n    url: PropTypes.string,\n\n    /**\n     * When displaying this component on a search results page (such as a subcategory), you can supply the SearchResultsModelBase instance here\n     * and this component will allow you to switch between grid and list views.\n     */\n    searchResults: PropTypes.shape({\n      layout: PropTypes.string.isRequired\n    })\n  }\n\n  switchLayout = layout => {\n    const { searchResults } = this.props\n    searchResults.switchLayout(layout)\n  }\n\n  renderViewToggle() {\n    const { classes, searchResults } = this.props\n    const layout = get(searchResults, 'layout', LAYOUT_GRID)\n\n    return searchResults ? (\n      <span className={classes.switchButtonsWrapper}>\n        <span\n          className={classnames(classes.switchButton, {\n            [classes.selectedSwitchButton]: layout === LAYOUT_GRID\n          })}\n        >\n          <GridViewIcon\n            color={layout === LAYOUT_GRID ? 'secondary' : 'primary'}\n            onClick={() => this.switchLayout(LAYOUT_GRID)}\n          />\n        </span>\n        <span\n          className={classnames(classes.switchButton, {\n            [classes.selectedSwitchButton]: layout === LAYOUT_LIST\n          })}\n        >\n          <ListViewIcon\n            color={layout === LAYOUT_LIST ? 'secondary' : 'primary'}\n            onClick={() => this.switchLayout(LAYOUT_LIST)}\n          />\n        </span>\n      </span>\n    ) : null\n  }\n\n  render() {\n    const { text, classes } = this.props\n\n    return (\n      <Paper className={classes.root}>\n        <Typography variant=\"caption\">\n          <span\n            onClick={() => {\n              this.onBack()\n            }}\n            className={classes.backButtonWrapper}\n          >\n            <ArrowLeft />\n          </span>\n          <span className={classes.label}>{text}</span>\n          {this.renderViewToggle()}\n        </Typography>\n      </Paper>\n    )\n  }\n\n  onBack = () => {\n    const { history, url } = this.props\n\n    if (url) {\n      history.push(url)\n    } else {\n      history.goBack()\n    }\n  }\n}\n",
    description: '',
    displayName: 'BackNav',
    methods: [
      {
        name: 'switchLayout',
        docblock: null,
        modifiers: [],
        params: [{ name: 'layout', type: null }],
        returns: null
      },
      { name: 'renderViewToggle', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'onBack', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'text',
        props: {
          type: { name: 'string' },
          required: true,
          description: 'The text to display representing the previous location.'
        }
      },
      {
        name: 'url',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The url to navigate to when clicked.  If omitted, this component will navigate back in the history when clicked.'
        }
      },
      {
        name: 'searchResults',
        props: {
          type: { name: 'shape', value: { layout: { name: 'string', required: true } } },
          required: false,
          description:
            'When displaying this component on a search results page (such as a subcategory), you can supply the SearchResultsModelBase instance here\nand this component will allow you to switch between grid and list views.'
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  BottomDrawer: {
    id: 'BottomDrawer',
    filename: 'BottomDrawer',
    importPath: 'BottomDrawer',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport Card from '@material-ui/core/Card'\nimport withStyles from '@material-ui/core/styles/withStyles'\n\n/**\n * A drawer that slides in from the bottom of the viewport.\n */\nexport const styles = theme => ({\n  root: {\n    position: 'fixed',\n    bottom: 0,\n    left: 0,\n    right: 0,\n    padding: '10px',\n    backgroundColor: theme.palette.background.paper,\n    display: 'flex',\n    flexDirection: 'row',\n    '& > *': {\n      flex: 1\n    }\n  }\n})\n\n@withStyles(styles, { name: 'RSFBottomDrawer' })\nexport default class BottomDrawer extends Component {\n  static propTypes = {\n    /**\n     * CSS classes to apply\n     */\n    classes: PropTypes.object\n  }\n\n  render() {\n    const { classes, children } = this.props\n    return <Card className={classes.root}>{children}</Card>\n  }\n}\n",
    description: '',
    displayName: 'BottomDrawer',
    methods: [],
    props: [
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes to apply' }
      }
    ],
    styles: { classes: ['root'], name: 'RSFBottomDrawer' }
  },
  Box: {
    id: 'Box',
    filename: 'Box',
    importPath: 'Box',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport classnames from 'classnames'\nimport PropTypes from 'prop-types'\n\n/**\n * A flex container.  All additional props are spread to the style of the underlying div.\n */\nexport const styles = theme => ({\n  root: {\n    display: 'flex'\n  },\n  split: {\n    justifyContent: 'space-between',\n    alignItems: 'center'\n  }\n})\n\n@withStyles(styles, { name: 'RSFBox' })\nexport default class Box extends Component {\n  static propTypes = {\n    /**\n     * CSS classes to apply\n     */\n    classes: PropTypes.object,\n\n    /**\n     * True to split items on opposite sides of the box by applying justify-content: 'space-between'\n     */\n    split: PropTypes.bool\n  }\n\n  render() {\n    const { className, classes, split = false, children, style, ...other } = this.props\n\n    return (\n      <div\n        className={classnames(classes.root, className, { [classes.split]: split })}\n        style={{ ...other, ...style }}\n      >\n        {children}\n      </div>\n    )\n  }\n}\n\n/**\n * A flex container with horizontal layout. All additional props are spread to the style\n * of the underlying div.\n */\nexport function Hbox(props) {\n  props = { ...props, flexDirection: 'row' }\n  return <Box alignItems=\"center\" {...props} />\n}\n\nHbox.propTypes = {\n  /**\n   * CSS classes to apply\n   */\n  classes: PropTypes.object,\n\n  /**\n   * True to split items on opposite sides of the box by applying justify-content: 'space-between'\n   */\n  split: PropTypes.bool\n}\n\n/**\n * A flex container with vertical layout. All additional props are spread to\n * the style of the underlying div.\n */\nexport function Vbox(props) {\n  props = { ...props, flexDirection: 'column' }\n  return <Box {...props} />\n}\n\nVbox.propTypes = {\n  /**\n   * CSS classes to apply\n   */\n  classes: PropTypes.object,\n\n  /**\n   * True to split items on opposite sides of the box by applying justify-content: 'space-between'\n   */\n  split: PropTypes.bool\n}\n",
    description: '',
    displayName: 'Box',
    methods: [],
    props: [
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes to apply' }
      },
      {
        name: 'split',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            "True to split items on opposite sides of the box by applying justify-content: 'space-between'"
        }
      }
    ],
    styles: { classes: ['root', 'split'], name: 'RSFBox' }
  },
  Breadcrumbs: {
    id: 'Breadcrumbs',
    filename: 'Breadcrumbs',
    importPath: 'Breadcrumbs',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport ArrowRight from '@material-ui/icons/KeyboardArrowRight'\nimport Link from './Link'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Typography from '@material-ui/core/Typography'\nimport { inject, observer } from 'mobx-react'\nimport Track from './Track'\nimport Container from './Container'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  breadcrumbs: {\n    margin: '0',\n    backgroundColor: '#F4F2F1',\n    padding: '12px 0',\n\n    '& a': {\n      color: theme.palette.text.primary,\n      textDecoration: 'none'\n    }\n  },\n\n  separator: {\n    height: '12px',\n    position: 'relative',\n    top: '2px',\n    width: '16px'\n  },\n\n  current: {\n    fontWeight: 'bold',\n    color: theme.palette.text.primary\n  }\n})\n\n/**\n * Renders a list of breadcrumbs from AppModelBase.breadcrumbs.  When a breadcrumb is clicked, the breadcrumb_clicked\n * analytics event is automatically fired.\n */\n@withStyles(styles, { name: 'RSFBreadcrumbs' })\n@inject('app')\n@observer\nexport default class Breadcrumbs extends Component {\n  static propTypes = {\n    /**\n     * The items to display, each with url, text, and state.\n     */\n    items: PropTypes.arrayOf(PropTypes.objectOf)\n  }\n\n  render() {\n    let {\n      app: { breadcrumbs },\n      items,\n      classes\n    } = this.props\n\n    breadcrumbs = items || breadcrumbs\n\n    return (\n      <Typography className={classes.breadcrumbs} variant=\"caption\">\n        <Container>\n          {breadcrumbs && breadcrumbs.map(this.renderBreadcrumb)}\n          <span>&nbsp;</span>\n        </Container>\n      </Typography>\n    )\n  }\n\n  renderBreadcrumb = (item, i) => {\n    const { classes } = this.props\n    const arrow = i > 0 ? <ArrowRight className={classes.separator} /> : null\n\n    if (item.url) {\n      return (\n        <span key={i}>\n          {arrow}\n          <Track event=\"breadcrumbClicked\" breadcrumb={item}>\n            <Link to={item.url} state={item.state}>\n              {item.text}\n            </Link>\n          </Track>\n        </span>\n      )\n    } else {\n      return (\n        <span key={i} className={classes.current}>\n          {arrow}\n          {item.text}\n        </span>\n      )\n    }\n  }\n}\n",
    description:
      'Renders a list of breadcrumbs from AppModelBase.breadcrumbs.  When a breadcrumb is clicked, the breadcrumb_clicked\nanalytics event is automatically fired.',
    displayName: 'Breadcrumbs',
    methods: [
      {
        name: 'renderBreadcrumb',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }, { name: 'i', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'items',
        props: {
          type: { name: 'arrayOf', value: { name: 'custom', raw: 'PropTypes.objectOf' } },
          required: false,
          description: 'The items to display, each with url, text, and state.'
        }
      }
    ],
    styles: { classes: ['breadcrumbs', 'separator', 'current'], name: 'RSFBreadcrumbs' }
  },
  ButtonSelector: {
    id: 'ButtonSelector',
    filename: 'ButtonSelector',
    importPath: 'ButtonSelector',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport classnames from 'classnames'\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport { PropTypes as MobxPropTypes } from 'mobx-react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Button from '@material-ui/core/Button'\nimport Image from './Image'\nimport Typography from '@material-ui/core/Typography'\nimport { inject, observer } from 'mobx-react'\n\nexport const styles = theme => ({\n  buttons: {\n    display: 'flex',\n    flexWrap: 'wrap',\n    margin: '-4px'\n  },\n  button: {\n    position: 'relative',\n    '& button': {\n      border: `1px solid ${theme.palette.divider}`,\n      padding: 0,\n      margin: '4px',\n      width: '60px',\n      minWidth: '60px',\n      height: '40px',\n      minHeight: '40px',\n      boxShadow: 'none'\n    }\n  },\n  buttonWithImage: {\n    '& button': {\n      width: '50px',\n      minWidth: '50px',\n      height: '50px',\n      minHeight: '50px'\n    }\n  },\n  selectedImage: {\n    '& button': {\n      borderWidth: '2px',\n      borderColor: theme.typography.body1.color\n    }\n  },\n  selected: {\n    '& button': {\n      borderColor: theme.palette.primary.main,\n      backgroundColor: theme.palette.primary.main,\n      color: theme.palette.primary.contrastText,\n      '&:hover': {\n        borderColor: theme.palette.primary.main,\n        backgroundColor: theme.palette.primary.main,\n        color: theme.palette.primary.contrastText\n      }\n    }\n  },\n  imageLabel: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    padding: '5px'\n  },\n  image: {\n    height: '100%',\n    width: '100%'\n  },\n  disabled: {\n    backgroundColor: '#f2f2f2',\n    color: '#999',\n    '& img': {\n      opacity: 0.5\n    }\n  },\n  selectedName: {\n    marginTop: '10px'\n  },\n  strikeThrough: {\n    height: '7px',\n    borderWidth: '2px 0',\n    borderStyle: 'solid',\n    borderColor: '#f2f2f2',\n    backgroundColor: '#666',\n    position: 'absolute',\n    width: '100%',\n    top: 'calc(50% - 3px)',\n    borderRadius: '10px'\n  }\n})\n\n/**\n * A selector for product options rendered as a set of buttons. Buttons can either have\n * text or an image. The text for the selected option can optionally be displayed below\n * the buttons.\n *\n * This component supports AMP.\n */\n@inject(({ app, ampStateId }) => ({ amp: app.amp, ampStateId }))\n@withStyles(styles, { name: 'RSFButtonSelector' })\n@observer\nexport default class ButtonSelector extends Component {\n  static propTypes = {\n    /**\n     * The instance of SelectionModelBase to bind to\n     */\n    model: MobxPropTypes.objectOrObservableObject.isRequired,\n\n    /**\n     * Callback function for tab change\n     * Args: event, selectedItem, index\n     */\n    onSelectionChange: PropTypes.func,\n\n    /**\n     * Overridable classes object to allow customization of component\n     */\n    classes: PropTypes.objectOf(PropTypes.string),\n\n    /**\n     * Props for displayed images. See <Image /> component for details\n     */\n    imageProps: PropTypes.object,\n\n    /**\n     * Props for button. See <Button /> component for details\n     */\n    buttonProps: PropTypes.object,\n\n    /**\n     * Set to true to show the name of the selected option in a caption below the buttons\n     */\n    showSelectedText: PropTypes.bool,\n\n    /**\n     * The name of property in amp state to bind to\n     */\n    name: PropTypes.string,\n\n    /**\n     * Set to `true` to show a slash through the item when disabled.  Defaults to `false`\n     */\n    strikeThroughDisabled: PropTypes.bool,\n\n    /**\n     * The angle in degress for the disabled indicator.  Defaults to `45`.\n     */\n    strikeThroughAngle: PropTypes.number\n  }\n\n  static defaultProps = {\n    items: [],\n    buttonProps: {},\n    imageProps: {},\n    showSelectedText: false,\n    strikeThroughDisabled: false,\n    strikeThroughAngle: 45\n  }\n\n  render() {\n    const { amp, model, ampStateId, name, showSelectedText, classes } = this.props\n\n    if (!model) return null\n\n    return (\n      <div className={classes.root}>\n        {amp && (\n          <input\n            type=\"hidden\"\n            name={name}\n            value={model.selected ? model.selected.id : ''}\n            amp-bind={`value=>${ampStateId}.${name}.selected.id`}\n          />\n        )}\n        <div className={classes.buttons}>{model.options.map(this.renderButton)}</div>\n        {showSelectedText && (\n          <Typography\n            variant=\"caption\"\n            component=\"div\"\n            className={classes.selectedName}\n            amp-bind={`text=>${ampStateId}.${name}.selected.text`}\n          >\n            {model.selected && model.selected.text}\n          </Typography>\n        )}\n      </div>\n    )\n  }\n\n  createButtonClass = (isSelected, { image, color }) => {\n    const { button, buttonWithImage, selectedImage, selected } = this.props.classes\n    const swatch = (image || color) != null\n\n    return classnames({\n      [button]: true,\n      [buttonWithImage]: swatch,\n      [selectedImage]: isSelected && swatch,\n      [selected]: isSelected && !swatch\n    })\n  }\n\n  renderButton = (option, i) => {\n    const {\n      classes,\n      strikeThroughDisabled,\n      strikeThroughAngle,\n      imageProps,\n      buttonProps,\n      model,\n      ampStateId,\n      name\n    } = this.props\n    const selected = model.selected && model.selected.id === option.id\n\n    let children = option.text\n\n    if (option.image) {\n      children = (\n        <Image\n          src={option.image}\n          className={classes.image}\n          fill\n          {...imageProps}\n          alt={option.alt || option.text}\n        />\n      )\n    } else if (option.color) {\n      children = <div className={classes.image} style={{ backgroundColor: option.color }} />\n    }\n\n    return (\n      <div\n        key={option.id}\n        className={this.createButtonClass(selected, option)}\n        amp-bind={`class=>${ampStateId}.${name}.selected.id==\"${\n          option.id\n        }\" ? \"${this.createButtonClass(true, option)}\" : \"${this.createButtonClass(\n          false,\n          option\n        )}\"`}\n      >\n        <Button\n          onClick={e => this.handleClick(e, option, i)}\n          aria-label={option.text}\n          href={option.url}\n          disabled={option.disabled}\n          on={`tap:AMP.setState({ ${ampStateId}: { ${name}: { selected: ${JSON.stringify(\n            option.toJSON()\n          )} }}})`}\n          classes={{\n            label: option.image || option.color ? classes.imageLabel : null,\n            disabled: classes.disabled\n          }}\n          {...buttonProps}\n        >\n          {children}\n        </Button>\n        {option.disabled && strikeThroughDisabled && (\n          <div\n            className={classes.strikeThrough}\n            style={{ transform: `rotate(${strikeThroughAngle}deg)` }}\n          />\n        )}\n      </div>\n    )\n  }\n\n  handleClick = (e, item, index) => {\n    const { onSelectionChange, model } = this.props\n\n    if (onSelectionChange) {\n      onSelectionChange(e, item, index)\n\n      if (e.isDefaultPrevented()) {\n        return\n      }\n    }\n\n    model.setSelected(item)\n  }\n}\n",
    description:
      'A selector for product options rendered as a set of buttons. Buttons can either have\ntext or an image. The text for the selected option can optionally be displayed below\nthe buttons.\n\nThis component supports AMP.',
    displayName: 'ButtonSelector',
    methods: [
      {
        name: 'createButtonClass',
        docblock: null,
        modifiers: [],
        params: [{ name: 'isSelected', type: null }, { name: '{ image, color }', type: null }],
        returns: null
      },
      {
        name: 'renderButton',
        docblock: null,
        modifiers: [],
        params: [{ name: 'option', type: null }, { name: 'i', type: null }],
        returns: null
      },
      {
        name: 'handleClick',
        docblock: null,
        modifiers: [],
        params: [
          { name: 'e', type: null },
          { name: 'item', type: null },
          { name: 'index', type: null }
        ],
        returns: null
      }
    ],
    props: [
      {
        name: 'model',
        props: {
          type: { name: 'custom', raw: 'MobxPropTypes.objectOrObservableObject.isRequired' },
          required: false,
          description: 'The instance of SelectionModelBase to bind to'
        }
      },
      {
        name: 'onSelectionChange',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'Callback function for tab change\nArgs: event, selectedItem, index'
        }
      },
      {
        name: 'classes',
        props: {
          type: { name: 'objectOf', value: { name: 'string' } },
          required: false,
          description: 'Overridable classes object to allow customization of component'
        }
      },
      {
        name: 'imageProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props for displayed images. See <Image /> component for details',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'buttonProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props for button. See <Button /> component for details',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'showSelectedText',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to show the name of the selected option in a caption below the buttons',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'name',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The name of property in amp state to bind to'
        }
      },
      {
        name: 'strikeThroughDisabled',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to `true` to show a slash through the item when disabled.  Defaults to `false`',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'strikeThroughAngle',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The angle in degress for the disabled indicator.  Defaults to `45`.',
          defaultValue: { value: '45', computed: false }
        }
      },
      { name: 'items', props: { defaultValue: { value: '[]', computed: false }, required: false } }
    ],
    styles: {
      classes: [
        'buttons',
        'button',
        'buttonWithImage',
        'selectedImage',
        'selected',
        'imageLabel',
        'image',
        'disabled',
        'selectedName',
        'strikeThrough'
      ],
      name: 'RSFButtonSelector'
    }
  },
  CartButton: {
    id: 'CartButton',
    filename: 'CartButton',
    importPath: 'CartButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport Link from './Link'\nimport Cart from '@material-ui/icons/ShoppingCart'\nimport ToolbarButton from './ToolbarButton'\nimport { inject, observer } from 'mobx-react'\nimport { withStyles } from '@material-ui/core/'\nimport Track from './Track'\n\nexport const styles = theme => ({\n  cartQuantity: {\n    color: '#fff',\n    backgroundColor: theme.palette.primary.main,\n    height: '20px',\n    width: '20px',\n    lineHeight: '20px',\n    fontSize: '14px',\n    borderRadius: '50%',\n    position: 'absolute',\n    top: '3px',\n    right: '5px'\n  },\n  icon: {}\n})\n\n@withStyles(styles, { name: 'RSFCartButton' })\n@inject(({ app }) => ({ cart: app.cart }))\n@observer\nexport default class CartButton extends Component {\n  static propTypes = {\n    /**\n     * The url path to cart.  Defaults to \"/cart\"\n     */\n    path: PropTypes.string,\n\n    /**\n     * Set to true to force server side navigation.  Defaults to false\n     */\n    server: PropTypes.bool,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * Optional Custom cart icon\n     */\n    icon: PropTypes.element\n  }\n\n  static defaultProps = {\n    path: '/cart'\n  }\n\n  render() {\n    const { classes, cart, path, server, onClick, icon, ...buttonProps } = this.props\n    const cartIcon = icon ? icon : <Cart className={classes.icon} />\n\n    return (\n      <Track event=\"cartClicked\">\n        <Link to={path} server={server} onClick={onClick}>\n          <ToolbarButton aria-label=\"Cart\" color=\"inherit\" icon={cartIcon} {...buttonProps}>\n            {cart && cart.quantity > 0 && (\n              <div className={classes.cartQuantity}>{cart.quantity}</div>\n            )}\n          </ToolbarButton>\n        </Link>\n      </Track>\n    )\n  }\n}\n",
    description: '',
    displayName: 'CartButton',
    methods: [],
    props: [
      {
        name: 'path',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The url path to cart.  Defaults to "/cart"',
          defaultValue: { value: "'/cart'", computed: false }
        }
      },
      {
        name: 'server',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to force server side navigation.  Defaults to false'
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'icon',
        props: {
          type: { name: 'element' },
          required: false,
          description: 'Optional Custom cart icon'
        }
      }
    ],
    styles: { classes: ['cartQuantity', 'icon'], name: 'RSFCartButton' }
  },
  CheckoutButton: {
    id: 'CheckoutButton',
    filename: 'CheckoutButton',
    importPath: 'CheckoutButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport Button from '@material-ui/core/Button'\nimport PropTypes from 'prop-types'\nimport { withStyles } from '@material-ui/core/'\nimport { inject } from 'mobx-react'\nimport classnames from 'classnames'\n\n/**\n * A button that links to Checkout, to be displayed on the Cart page.  The style matches\n * AddToCartButton by default.\n */\nexport const styles = theme => ({\n  root: {\n    fontSize: theme.typography.subheading.fontSize,\n    padding: `${theme.margins.container}px`\n  },\n  docked: {\n    position: 'fixed',\n    left: 0,\n    bottom: 0,\n    width: '100%',\n    zIndex: 1,\n    borderRadius: '0'\n  }\n})\n\n@withStyles(styles, { name: 'RSFCheckoutButton' })\n@inject('history')\nexport default class CheckoutButton extends Component {\n  static propTypes = {\n    /**\n     * The URL for checkout.  Defaults to \"/checkout\"\n     */\n    url: PropTypes.string,\n\n    /**\n     * Set to true to dock the button at the bottom of the viewport so that it is always visible\n     */\n    docked: PropTypes.bool\n  }\n\n  static defaultProps = {\n    url: '/checkout',\n    docked: false\n  }\n\n  render() {\n    const { classes, className, url, children, docked, ...others } = this.props\n\n    return (\n      <Button\n        size=\"large\"\n        color=\"secondary\"\n        onClick={this.onClick}\n        variant=\"contained\"\n        {...others}\n        classes={{ root: classes.root }}\n        className={classnames(className, { [classes.docked]: docked })}\n      >\n        {children || 'Checkout'}\n      </Button>\n    )\n  }\n\n  onClick = () => {\n    const { history, url } = this.props\n\n    if (url.match(/^(https?:)?\\/\\//)) {\n      window.location.href = url\n    } else {\n      history.push(url)\n    }\n  }\n}\n",
    description: '',
    displayName: 'CheckoutButton',
    methods: [{ name: 'onClick', docblock: null, modifiers: [], params: [], returns: null }],
    props: [
      {
        name: 'url',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The URL for checkout.  Defaults to "/checkout"',
          defaultValue: { value: "'/checkout'", computed: false }
        }
      },
      {
        name: 'docked',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to dock the button at the bottom of the viewport so that it is always visible',
          defaultValue: { value: 'false', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'docked'], name: 'RSFCheckoutButton' }
  },
  CmsSlot: {
    id: 'CmsSlot',
    filename: 'CmsSlot',
    importPath: 'CmsSlot',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport classnames from 'classnames'\nimport PropTypes from 'prop-types'\nimport withStyles from '@material-ui/core/styles/withStyles'\n\nexport const styles = theme => ({\n  inline: {\n    display: 'inline'\n  },\n  block: {\n    display: 'block'\n  }\n})\n\n/**\n * A container for HTML blob content from a CMS.  Content is dangerously inserted into the DOM.\n * Pass the html as a string as the child of this component. Additional props are spread to the\n * rendered span element.\n */\n@withStyles(styles, { name: 'RSFCmsSlot' })\nexport default class CmsSlot extends Component {\n  static proptypes = {\n    /**\n     * Use inline prop to use display:inline style\n     */\n    inline: PropTypes.boolean\n  }\n  render() {\n    const { children, className, classes, inline, ...others } = this.props\n    return children ? (\n      <span\n        {...others}\n        className={classnames(className, { [classes.inline]: inline, [classes.block]: !inline })}\n        dangerouslySetInnerHTML={{ __html: children }}\n      />\n    ) : null\n  }\n}\n",
    description:
      'A container for HTML blob content from a CMS.  Content is dangerously inserted into the DOM.\nPass the html as a string as the child of this component. Additional props are spread to the\nrendered span element.',
    displayName: 'CmsSlot',
    methods: [],
    styles: { classes: ['inline', 'block'], name: 'RSFCmsSlot' },
    props: []
  },
  Container: {
    id: 'Container',
    filename: 'Container',
    importPath: 'Container',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\n\n/**\n * Provides proper margins based on theme.margins.container.  All\n * additional props are spread to the underlying div element.\n */\nexport const styles = theme => ({\n  root: {\n    margin: `0 auto`,\n    maxWidth: theme.maxWidth || '100vw'\n  },\n  inset: {\n    padding: `0 ${theme.margins && theme.margins.container}px`\n  }\n})\n\n@withStyles(styles, { name: 'RSFContainer' })\nexport default class Container extends Component {\n  static propTypes = {\n    /**\n     * CSS classes to apply\n     */\n    classes: PropTypes.object,\n\n    /**\n     * Set to false to remove the left and right padding.\n     */\n    inset: PropTypes.bool\n  }\n\n  static defaultProps = {\n    inset: true\n  }\n\n  render() {\n    const { classes, className, children, inset, ...rest } = this.props\n\n    return (\n      <div className={classnames(classes.root, className, { [classes.inset]: inset })} {...rest}>\n        {children}\n      </div>\n    )\n  }\n}\n",
    description: '',
    displayName: 'Container',
    methods: [],
    props: [
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes to apply' }
      },
      {
        name: 'inset',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to false to remove the left and right padding.',
          defaultValue: { value: 'true', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'inset'], name: 'RSFContainer' }
  },
  DialogClose: {
    id: 'DialogClose',
    filename: 'DialogClose',
    importPath: 'DialogClose',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport IconButton from '@material-ui/core/IconButton'\nimport Close from '@material-ui/icons/Close'\n\n/**\n * A close button for modal dialogs. All props are spread to the underlying\n * Material UI IconButton.\n */\nexport default class DialogClose extends Component {\n  render() {\n    const { style = {}, onClick, ...props } = this.props\n\n    return (\n      <IconButton\n        onClick={onClick}\n        style={{ position: 'absolute', top: 0, right: 0, ...style }}\n        {...props}\n      >\n        <Close />\n      </IconButton>\n    )\n  }\n}\n",
    description:
      'A close button for modal dialogs. All props are spread to the underlying\nMaterial UI IconButton.',
    displayName: 'DialogClose',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  Divider: {
    id: 'Divider',
    filename: 'Divider',
    importPath: 'Divider',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\n\nexport const styles = theme => ({\n  root: {\n    background: theme.palette.divider,\n    alignSelf: 'stretch'\n  },\n  vertical: {\n    height: '100%',\n    width: '1px'\n  },\n  horizontal: {\n    height: '1px'\n  }\n})\n\n@withStyles(styles, { name: 'RSFDivider' })\nexport default class Divider extends Component {\n  static propTypes = {\n    /**\n     * True to display a vertical divider\n     */\n    vertical: PropTypes.bool,\n\n    /**\n     * True to display a horizontal divider\n     */\n    horizontal: PropTypes.bool,\n\n    /**\n     * CSS classes to apply\n     */\n    classes: PropTypes.object\n  }\n\n  render() {\n    let { classes, className, vertical, horizontal, ...rest } = this.props\n\n    if (!vertical && !horizontal) horizontal = true\n\n    return (\n      <div\n        className={classnames(className, classes.root, {\n          [classes.vertical]: vertical,\n          [classes.horizontal]: horizontal\n        })}\n        {...rest}\n      />\n    )\n  }\n}\n",
    description: '',
    displayName: 'Divider',
    methods: [],
    props: [
      {
        name: 'vertical',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'True to display a vertical divider'
        }
      },
      {
        name: 'horizontal',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'True to display a horizontal divider'
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes to apply' }
      }
    ],
    styles: { classes: ['root', 'vertical', 'horizontal'], name: 'RSFDivider' }
  },
  Drawer: {
    id: 'Drawer',
    filename: 'Drawer',
    importPath: 'Drawer',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport ResizeObserver from 'resize-observer-polyfill'\nimport MUIDrawer from '@material-ui/core/Drawer'\nimport { withStyles } from '@material-ui/core/styles'\nimport Close from '@material-ui/icons/Close'\nimport Fab from '@material-ui/core/Fab'\nimport PropTypes from 'prop-types'\nimport Typography from '@material-ui/core/Typography'\nimport { inject } from 'mobx-react'\nimport classnames from 'classnames'\n\n/**\n * A slide-in drawer with fab close button.\n */\nexport const styles = theme => ({\n  closeButton: {\n    position: 'absolute',\n    right: '10px',\n    top: '-28px',\n    zIndex: 1\n  },\n\n  container: {\n    height: '100%',\n    boxSizing: 'border-box',\n    flexWrap: 'nowrap',\n    display: 'flex',\n    flexDirection: 'column'\n  },\n\n  content: {\n    flexBasis: '100%',\n    overflow: 'auto'\n  },\n\n  paper: {\n    overflowY: 'visible'\n  },\n\n  title: {\n    flexBasis: 'auto',\n    flexGrow: 0,\n    flexShrink: 1,\n    width: '100%',\n    height: '72px',\n    lineHeight: '72px',\n    textAlign: 'center',\n    borderBottom: `1px solid ${theme.palette.divider}`\n  },\n\n  ampClosed: {\n    display: 'none'\n  }\n})\n\n@withStyles(styles, { name: 'RSFDrawer' })\n@inject(({ app, ampStateId }) => ({ amp: app && app.amp, ampStateId }))\nexport default class Drawer extends Component {\n  static propTypes = {\n    /**\n     * Set to false to hide the close button. Defaults to true\n     */\n    showCloseButton: PropTypes.bool,\n\n    /**\n     * Called when the user closes the drawer\n     */\n    onRequestClose: PropTypes.func.isRequired,\n\n    /**\n     * The title to display at the top of the drawer\n     */\n    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n    /**\n     * Set to true to automatically add padding to the body when the drawer\n     * is open so that the user is able to scroll and see all of the body content.\n     * Defaults to false.\n     */\n    autoAdjustBodyPadding: PropTypes.bool,\n\n    /**\n     * Props to apply to the closeButton\n     */\n    closeButtonProps: PropTypes.object,\n\n    /**\n     * The name of a property the amp-state to bind to the closed state of the drawer.\n     */\n    ampBindClosed: PropTypes.string\n  }\n\n  static defaultProps = {\n    showCloseButton: true,\n    autoAdjustBodyPadding: false,\n    closeButtonProps: {}\n  }\n\n  constructor() {\n    super()\n    this.drawer = React.createRef()\n  }\n\n  render() {\n    const {\n      amp,\n      ampStateId,\n      ampBindClosed,\n      variant,\n      closeButtonProps,\n      showCloseButton,\n      open,\n      onRequestClose,\n      title,\n      children,\n      classes,\n      autoAdjustBodyPadding,\n      ...rest\n    } = this.props\n\n    return (\n      <MUIDrawer\n        anchor=\"bottom\"\n        classes={{\n          paper: classnames({\n            [classes.paper]: true,\n            [classes.ampClosed]: amp && !open\n          })\n        }}\n        amp-bind={\n          ampBindClosed\n            ? `class=>${ampStateId}.${ampBindClosed} ? '${classes.ampClosed}' : null`\n            : null\n        }\n        open={(amp && variant === 'temporary') || open}\n        variant={variant}\n        {...rest}\n      >\n        <div className={classes.container} ref={this.drawer}>\n          {title && (\n            <Typography className={classes.title} variant=\"h6\" component=\"div\">\n              {title}\n            </Typography>\n          )}\n\n          {showCloseButton && (\n            <Fab\n              color=\"primary\"\n              className={classes.closeButton}\n              onClick={this.closeDrawer}\n              style={{ display: open ? '' : 'none' }}\n              on={\n                ampBindClosed\n                  ? `tap:AMP.setState({ ${ampStateId}: { ${ampBindClosed}: true }})`\n                  : null\n              }\n              {...closeButtonProps}\n            >\n              <Close />\n            </Fab>\n          )}\n\n          <div className={classes.content}>{children}</div>\n        </div>\n      </MUIDrawer>\n    )\n  }\n\n  // add body padding equal to drawer height\n  componentDidMount() {\n    this.setPadding()\n    const el = this.drawer.current\n\n    if (this.props.autoAdjustBodyPadding && el) {\n      this.drawerResize = new ResizeObserver(() => {\n        document.body.style.paddingBottom = el && el.clientHeight + 'px'\n      })\n\n      this.drawerResize.observe(el)\n    }\n  }\n\n  componentWillUnmount() {\n    const el = this.drawer.current\n\n    if (this.drawerResize && el) {\n      this.drawerResize.unobserve(el)\n    }\n  }\n\n  // if value of open property changes, recalcuate drawer height/body padding\n  componentWillReceiveProps(nextProps) {\n    if (nextProps.open && !this.props.open) {\n      this.setPadding()\n    } else if (this.props.open && !nextProps.open) {\n      this.closeDrawer()\n    }\n  }\n\n  setPadding() {\n    if (this.props.autoAdjustBodyPadding) {\n      requestAnimationFrame(() => {\n        const el = this.drawer.current\n        document.body.style.paddingBottom = el && el.clientHeight + 'px'\n      })\n    }\n  }\n\n  closeDrawer = () => {\n    const { onRequestClose } = this.props\n    onRequestClose()\n    document.body.style.paddingBottom = 0\n  }\n}\n",
    description: '',
    displayName: 'Drawer',
    methods: [
      { name: 'setPadding', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'closeDrawer', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'showCloseButton',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to false to hide the close button. Defaults to true',
          defaultValue: { value: 'true', computed: false }
        }
      },
      {
        name: 'onRequestClose',
        props: {
          type: { name: 'func' },
          required: true,
          description: 'Called when the user closes the drawer'
        }
      },
      {
        name: 'title',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'The title to display at the top of the drawer'
        }
      },
      {
        name: 'autoAdjustBodyPadding',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to automatically add padding to the body when the drawer\nis open so that the user is able to scroll and see all of the body content.\nDefaults to false.',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'closeButtonProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props to apply to the closeButton',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'ampBindClosed',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The name of a property the amp-state to bind to the closed state of the drawer.'
        }
      }
    ],
    styles: {
      classes: ['closeButton', 'container', 'content', 'paper', 'title', 'ampClosed'],
      name: 'RSFDrawer'
    }
  },
  ErrorReporter: {
    id: 'ErrorReporter',
    filename: 'ErrorReporter',
    importPath: 'ErrorReporter',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport { inject, observer, disposeOnUnmount } from 'mobx-react'\nimport { reaction } from 'mobx'\nimport { isServer } from 'react-storefront/environment'\n\n/**\n * Use this component to report errors to the error logging service of your choice.\n * Any time an error occurs in your app, the function you pass to `onError` prop will\n * be called.  This includes errors that occur in handlers on the server as well\n * as react rendering on both client and server.  Errors that occur on the server\n * will be reported from the server.  Errors that occur on the client will be reported\n * from the client.\n *\n * Example usage:\n *\n *  import React, { Component } from 'react'\n *  import ErrorReporter from 'react-storefront/ErrorReporter'\n *\n *  class App extends Component {\n *\n *    render() {\n *      return (\n *        <div>\n *          <ErrorReporter onError={this.reportError}/>\n *          // ... the rest of your app goes here\n *        </div>\n *      )\n *    }\n *\n *    reportError = ({ error, stack }) => {\n *      // send error to some error reporting service\n *    }\n *\n *  }\n */\n@inject('app')\n@observer\nexport default class ErrorReporter extends Component {\n  static propTypes = {\n    /**\n     * A function to call whenever an error occurs.  The function is passed an\n     * object with `error` (the error message) and `stack` (the stack trace as a string).\n     */\n    onError: PropTypes.func.isRequired\n  }\n\n  componentWillMount() {\n    if (isServer()) {\n      // here we only report errors on the server so they aren't duplicated\n      // when the app mounts on the client.\n      this.reportError()\n    }\n  }\n\n  reportError = () => {\n    const { error, stack } = this.props.app\n\n    if (error) {\n      this.props.onError({ error, stack })\n    }\n  }\n\n  render() {\n    return null\n  }\n\n  // call reportError whenever app.error changes\n  @disposeOnUnmount\n  disposer = reaction(() => this.props.app.error, this.reportError)\n}\n",
    description:
      "Use this component to report errors to the error logging service of your choice.\nAny time an error occurs in your app, the function you pass to `onError` prop will\nbe called.  This includes errors that occur in handlers on the server as well\nas react rendering on both client and server.  Errors that occur on the server\nwill be reported from the server.  Errors that occur on the client will be reported\nfrom the client.\n\nExample usage:\n\n import React, { Component } from 'react'\n import ErrorReporter from 'react-storefront/ErrorReporter'\n\n class App extends Component {\n\n   render() {\n     return (\n       <div>\n         <ErrorReporter onError={this.reportError}/>\n         // ... the rest of your app goes here\n       </div>\n     )\n   }\n\n   reportError = ({ error, stack }) => {\n     // send error to some error reporting service\n   }\n\n }",
    displayName: 'ErrorReporter',
    methods: [{ name: 'reportError', docblock: null, modifiers: [], params: [], returns: null }],
    props: [
      {
        name: 'onError',
        props: {
          type: { name: 'func' },
          required: true,
          description:
            'A function to call whenever an error occurs.  The function is passed an\nobject with `error` (the error message) and `stack` (the stack trace as a string).'
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  ExpandableSection: {
    id: 'ExpandableSection',
    filename: 'ExpandableSection',
    importPath: 'ExpandableSection',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\nimport ExpansionPanel from '@material-ui/core/ExpansionPanel'\nimport ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'\nimport ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'\nimport ExpandMoreIcon from '@material-ui/icons/ExpandMore'\nimport Typography from '@material-ui/core/Typography'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport AmpExpandableSection from './amp/AmpExpandableSection'\nimport { inject } from 'mobx-react'\nimport withTheme from '@material-ui/core/styles/withTheme'\n\nexport const styles = theme => ({\n  root: {\n    boxShadow: 'none',\n    borderBottom: `1px solid ${theme.palette.divider}`,\n    background: 'transparent',\n\n    '&::before': {\n      display: 'none'\n    },\n\n    '& > *:first-child': {\n      padding: '0',\n      minHeight: '0'\n    }\n  },\n\n  margins: {\n    padding: `0 ${theme.margins.container}px`\n  },\n\n  caption: {\n    transition: 'opacity .2s linear'\n  },\n\n  expandedCaption: {\n    opacity: 0\n  },\n\n  largeTitle: {\n    fontSize: '18px',\n    fontWeight: 'bold',\n    color: '#444'\n  },\n\n  details: {\n    padding: 0\n  },\n\n  summary: {\n    display: 'flex',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    '[aria-expanded=true] > &': {\n      margin: '12px 0 !important'\n    }\n  },\n\n  withCollapseIcon: {\n    transform: 'translateY(-50%) rotate(0deg) !important'\n  },\n\n  summaryIconWrap: {\n    right: `-${theme.margins.container}px`\n  },\n\n  expandedPanel: {\n    margin: 0\n  },\n\n  expandIcon: {},\n  collapseIcon: {}\n})\n\n@withStyles(styles, { name: 'RSFExpandableSection' })\n@withTheme()\n@inject(({ app }) => ({ amp: app.amp }))\nexport default class ExpandableSection extends Component {\n  static propTypes = {\n    /**\n     * The title for the header of the expandable section\n     */\n    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n    /**\n     * Text to display to the right of the heading\n     */\n    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n    /**\n     * The icon to use for collapsed groups\n     */\n    ExpandIcon: PropTypes.func,\n\n    /**\n     * The icon to use for expanded groups\n     */\n    CollapseIcon: PropTypes.func,\n\n    /**\n     * Set to false to remove the default left and right margins. Defaults to `true`.\n     */\n    margins: PropTypes.bool,\n\n    /**\n     * Controls the expanded state.  Defaults to false\n     */\n    expanded: PropTypes.bool\n  }\n\n  static defaultProps = {\n    margins: true\n  }\n\n  static getDerivedStateFromProps({ expanded }) {\n    if (typeof expanded !== 'undefined') {\n      return { expanded }\n    } else {\n      return {}\n    }\n  }\n\n  constructor({ expanded, ExpandIcon, CollapseIcon, theme }) {\n    super()\n\n    this.ExpandIcon = ExpandIcon || theme.ExpandIcon || ExpandMoreIcon\n    this.CollapseIcon = CollapseIcon || theme.CollapseIcon || this.ExpandIcon\n\n    this.state = {\n      expanded\n    }\n  }\n\n  render() {\n    let {\n      amp,\n      classes,\n      theme,\n      children = [],\n      title,\n      caption,\n      expanded,\n      ExpandIcon: ei,\n      CollapseIcon: ci,\n      margins,\n      ...others\n    } = this.props\n\n    const { ExpandIcon, CollapseIcon } = this\n\n    if (amp) {\n      return (\n        <AmpExpandableSection ExpandIcon={ExpandIcon} CollapseIcon={CollapseIcon} title={title}>\n          {children}\n        </AmpExpandableSection>\n      )\n    } else {\n      return (\n        <ExpansionPanel\n          classes={{\n            root: classnames({\n              [classes.root]: true,\n              [classes.margins]: margins,\n              [classes.expandedPanel]: true\n            })\n          }}\n          expanded={expanded}\n          {...others}\n          onChange={this.onChange}\n        >\n          <ExpansionPanelSummary\n            expandIcon={\n              this.state.expanded ? (\n                <CollapseIcon className={classes.collapseIcon} />\n              ) : (\n                <ExpandIcon className={classes.expandIcon} />\n              )\n            }\n            classes={this.getSummaryClasses()}\n          >\n            <Typography variant=\"subtitle1\">{title}</Typography>\n            {caption && (\n              <Typography\n                variant=\"caption\"\n                className={classnames({\n                  [classes.caption]: true,\n                  [classes.expandedCaption]: expanded\n                })}\n              >\n                {caption}\n              </Typography>\n            )}\n          </ExpansionPanelSummary>\n          <ExpansionPanelDetails classes={{ root: classes.details }}>\n            {children}\n          </ExpansionPanelDetails>\n        </ExpansionPanel>\n      )\n    }\n  }\n\n  /**\n   * Gets the classes for the ExpansionPanelSummary\n   * Here we add a class to remove the rotate transform if we're using a\n   * separate icon for the collapse state.\n   */\n  getSummaryClasses() {\n    const { classes } = this.props\n\n    const result = {\n      content: classes.summary,\n      expandIcon: classes.summaryIconWrap\n    }\n\n    if (this.CollapseIcon !== this.ExpandIcon) {\n      result.expandIcon = classes.withCollapseIcon\n    }\n\n    return result\n  }\n\n  onChange = (e, expanded) => {\n    if (this.props.onChange) {\n      this.props.onChange(e, expanded)\n    }\n    this.setState({ expanded })\n  }\n}\n",
    description: '',
    displayName: 'ExpandableSection',
    methods: [
      {
        name: 'getDerivedStateFromProps',
        docblock: null,
        modifiers: ['static'],
        params: [{ name: '{ expanded }', type: null }],
        returns: null
      },
      {
        name: 'getSummaryClasses',
        docblock:
          "Gets the classes for the ExpansionPanelSummary\nHere we add a class to remove the rotate transform if we're using a\nseparate icon for the collapse state.",
        modifiers: [],
        params: [],
        returns: null,
        description:
          "Gets the classes for the ExpansionPanelSummary\nHere we add a class to remove the rotate transform if we're using a\nseparate icon for the collapse state."
      },
      {
        name: 'onChange',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }, { name: 'expanded', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'title',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'The title for the header of the expandable section'
        }
      },
      {
        name: 'caption',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'Text to display to the right of the heading'
        }
      },
      {
        name: 'ExpandIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'The icon to use for collapsed groups'
        }
      },
      {
        name: 'CollapseIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'The icon to use for expanded groups'
        }
      },
      {
        name: 'margins',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to false to remove the default left and right margins. Defaults to `true`.',
          defaultValue: { value: 'true', computed: false }
        }
      },
      {
        name: 'expanded',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Controls the expanded state.  Defaults to false'
        }
      }
    ],
    styles: {
      classes: [
        'root',
        'margins',
        'caption',
        'expandedCaption',
        'largeTitle',
        'details',
        'summary',
        'withCollapseIcon',
        'summaryIconWrap',
        'expandedPanel',
        'expandIcon',
        'collapseIcon'
      ],
      name: 'RSFExpandableSection'
    }
  },
  Filter: {
    id: 'Filter',
    filename: 'Filter',
    importPath: 'Filter',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport get from 'lodash/get'\nimport { observer, inject } from 'mobx-react'\nimport ExpandableSection from './ExpandableSection'\nimport Checkbox from '@material-ui/core/Checkbox'\nimport LoadMask from './LoadMask'\nimport FormGroup from '@material-ui/core/FormGroup'\nimport FormControlLabel from '@material-ui/core/FormControlLabel'\nimport Button from '@material-ui/core/Button'\nimport Typography from '@material-ui/core/Typography'\nimport PropTypes from 'prop-types'\nimport { Hbox } from './Box'\n\n/**\n * UI for filtering an instance of SearchResultModelBase.  This component can be used on its own, or you can use\n * FilterButton to automatically display this component in a drawer that slides up from the bottom of the viewport.\n */\nexport const styles = theme => ({\n  root: {\n    height: '100%',\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'stretch'\n  },\n  facetGroups: {\n    overflow: 'auto',\n    overflowX: 'hidden',\n    flex: '1',\n    position: 'relative'\n  },\n  matches: {\n    marginLeft: '5px',\n    display: 'inline'\n  },\n  footer: {\n    backgroundColor: theme.palette.secondary.main,\n    padding: '12px 20px',\n    color: 'white',\n    justifyContent: 'space-between',\n    alignItems: 'center'\n  },\n  itemsFound: {\n    color: theme.palette.secondary.contrastText\n  },\n  title: {\n    ...theme.typography.subtitle1,\n    marginBottom: `12px`\n  },\n  noMargins: {\n    margin: 0\n  },\n  groupLabel: {\n    display: 'flex',\n    alignItems: 'center'\n  }\n})\n\n@withStyles(styles, { name: 'RSFFilter' })\n@inject('router')\n@observer\nexport default class Filter extends Component {\n  static propTypes = {\n    /**\n     * An instance of `SearchResultModelBase`\n     */\n    model: PropTypes.object,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * A function to call when the user clicks the button to view updated results.  The default behavior can be\n     * canceled by calling `preventDefault` on the passed in event.  The event is passed as the only argument.\n     */\n    onViewResultsClick: PropTypes.func,\n\n    /**\n     * The query string parameter that should be updated when filters are changed.  The value will be an array\n     * of codes for each selected facet.  Defaults to \"filters\"\n     */\n    queryParam: PropTypes.string,\n\n    /**\n     * An optional title to display at the top of the component.\n     */\n    title: PropTypes.string,\n\n    /**\n     * Set to false to remove the default left and right margins. Defaults to `true`.\n     */\n    margins: PropTypes.bool,\n\n    /**\n     * Set to `true` to expand all groups on initial render\n     */\n    expandAll: PropTypes.bool\n  }\n\n  static defaultProps = {\n    onViewResultsClick: Function.prototype,\n    queryParam: 'filters',\n    margins: true\n  }\n\n  constructor(props) {\n    super(props)\n\n    this.state = {\n      expanded: props.expandAll ? this.createExpandAllState() : {}\n    }\n  }\n\n  render() {\n    const { model, classes, title } = this.props\n\n    return (\n      <div className={classes.root}>\n        {title ? <div className={classes.title}>{title}</div> : null}\n        <div className={classes.facetGroups}>\n          <LoadMask show={model.loading} transparent align=\"top\" />\n          {get(model, 'facetGroups', []).map((facetGroup, i) =>\n            this.renderFacetGroup(facetGroup, i)\n          )}\n        </div>\n        {model.filtersChanged && (\n          <Hbox className={classes.footer} split>\n            <Typography variant=\"subtitle1\" className={classes.itemsFound}>\n              {model.filters.length || 'No'} filter{model.filters.length === 1 ? '' : 's'} selected\n            </Typography>\n            <Button\n              variant=\"contained\"\n              size=\"large\"\n              color=\"default\"\n              onClick={this.onViewResultsClick}\n            >\n              View Results\n            </Button>\n          </Hbox>\n        )}\n      </div>\n    )\n  }\n\n  renderFacetGroup(group, key) {\n    const { model, classes, margins } = this.props\n    const { expanded } = this.state\n    const selection = []\n\n    const formGroup = (\n      <FormGroup key={key}>\n        {group.facets.map((facet, i) => {\n          let checked = false\n\n          if (get(model, 'filters', []).indexOf(facet.code) !== -1) {\n            selection.push(facet)\n            checked = true\n          }\n\n          return (\n            <FormControlLabel\n              key={i}\n              label={\n                <div className={classes.groupLabel}>\n                  <span>{facet.name}</span>\n                  <Typography variant=\"caption\" className={classes.matches} component=\"span\">\n                    ({facet.matches})\n                  </Typography>\n                </div>\n              }\n              control={\n                <Checkbox\n                  checked={checked}\n                  color=\"primary\"\n                  onChange={this.onToggleFilter.bind(this, facet)}\n                />\n              }\n            />\n          )\n        })}\n      </FormGroup>\n    )\n\n    let caption = null\n\n    if (selection.length === 1) {\n      caption = selection[0].name\n    } else if (selection.length > 0) {\n      caption = `${selection.length} selected`\n    }\n\n    return (\n      <ExpandableSection\n        key={key}\n        title={group.name}\n        caption={caption}\n        expanded={expanded[group.name]}\n        onChange={(e, expanded) =>\n          this.setState({ expanded: { ...this.state.expanded, [group.name]: expanded } })\n        }\n        margins={margins}\n      >\n        {formGroup}\n      </ExpandableSection>\n    )\n  }\n\n  onToggleFilter = facet => {\n    this.props.model.toggleFilter(facet)\n\n    if (this.props.refreshOnChange) {\n      this.refresh()\n    }\n  }\n\n  onViewResultsClick = e => {\n    this.props.onViewResultsClick(e)\n\n    if (!e.isDefaultPrevented()) {\n      this.refresh()\n    }\n  }\n\n  refresh() {\n    const { router, model } = this.props\n    router.applySearch({\n      [this.props.queryParam]: model.filters.toJSON()\n    })\n    model.refresh()\n  }\n\n  createExpandAllState = () => {\n    const state = {}\n    const { model } = this.props\n\n    if (model) {\n      for (let group of model.facetGroups) {\n        state[group.name] = true\n      }\n    }\n\n    return state\n  }\n}\n",
    description: '',
    displayName: 'Filter',
    methods: [
      {
        name: 'renderFacetGroup',
        docblock: null,
        modifiers: [],
        params: [{ name: 'group', type: null }, { name: 'key', type: null }],
        returns: null
      },
      {
        name: 'onToggleFilter',
        docblock: null,
        modifiers: [],
        params: [{ name: 'facet', type: null }],
        returns: null
      },
      {
        name: 'onViewResultsClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      },
      { name: 'refresh', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'createExpandAllState', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'model',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'An instance of `SearchResultModelBase`'
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'onViewResultsClick',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            'A function to call when the user clicks the button to view updated results.  The default behavior can be\ncanceled by calling `preventDefault` on the passed in event.  The event is passed as the only argument.',
          defaultValue: { value: 'Function.prototype', computed: true }
        }
      },
      {
        name: 'queryParam',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The query string parameter that should be updated when filters are changed.  The value will be an array\nof codes for each selected facet.  Defaults to "filters"',
          defaultValue: { value: "'filters'", computed: false }
        }
      },
      {
        name: 'title',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'An optional title to display at the top of the component.'
        }
      },
      {
        name: 'margins',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to false to remove the default left and right margins. Defaults to `true`.',
          defaultValue: { value: 'true', computed: false }
        }
      },
      {
        name: 'expandAll',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to `true` to expand all groups on initial render'
        }
      }
    ],
    styles: {
      classes: [
        'root',
        'facetGroups',
        'matches',
        'footer',
        'itemsFound',
        'title',
        'noMargins',
        'groupLabel'
      ],
      name: 'RSFFilter'
    }
  },
  FilterButton: {
    id: 'FilterButton',
    filename: 'FilterButton',
    importPath: 'FilterButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport ActionButton from './ActionButton'\nimport Filter from './Filter'\nimport PropTypes from 'prop-types'\nimport Drawer from './Drawer'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport classnames from 'classnames'\nimport grey from '@material-ui/core/colors/grey'\nimport { Hbox } from './Box'\n\nexport const styles = theme => ({\n  clear: {\n    ...theme.typography.caption,\n    padding: 0,\n    marginLeft: '10px',\n    textDecoration: 'underline'\n  },\n  clearDisabled: {\n    color: grey[400]\n  },\n  drawer: {\n    height: '75vh'\n  }\n})\n\n/**\n * A button that when clicked, opens a drawer containing the `Filter` view. Current filters\n * are displayed in the button text.\n */\n@withStyles(styles, { name: 'RSFFilterButton' })\n@inject('app')\n@observer\nexport default class FilterButton extends Component {\n  static propTypes = {\n    /**\n     * An instance of `SearchResultModelBase`\n     */\n    model: PropTypes.object,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * Props for the underlying `Filter` component\n     */\n    drawerProps: PropTypes.object,\n\n    /**\n     * The label for the button and the drawer header.  Defaults to \"Filter\".\n     */\n    title: PropTypes.string,\n\n    /**\n     * Set to true to hide the clear link that is shown by default when one or more filters\n     * is selected.  Defaults to false.\n     */\n    hideClearLink: PropTypes.bool,\n\n    /**\n     * Text for the clear link.  Defaults to \"clear all\".\n     */\n    clearLinkText: PropTypes.string\n  }\n\n  static defaultProps = {\n    title: 'Filter',\n    drawerProps: {},\n    hideClearLink: false,\n    clearLinkText: 'clear all'\n  }\n\n  constructor({ app }) {\n    super()\n\n    const openFilter = app.location.search.indexOf('openFilter') !== -1\n\n    this.state = {\n      open: openFilter,\n      mountDrawer: openFilter\n    }\n  }\n\n  render() {\n    const {\n      classes,\n      app,\n      model,\n      title,\n      drawerProps,\n      hideClearLink,\n      clearLinkText,\n      ...props\n    } = this.props\n    const { open, mountDrawer } = this.state\n    const { clear, clearDisabled, drawer, ...buttonClasses } = classes\n    const pwaPath = app.location.pathname.replace(/\\.amp/, '')\n    const pwaSearch = app.location.search || ''\n    const queryChar = pwaSearch ? '&' : '?'\n    const ampUrl = pwaPath + pwaSearch + queryChar + 'openFilter'\n\n    return (\n      <Fragment>\n        <ActionButton\n          label={title}\n          href={app.amp ? ampUrl : null}\n          value={this.getFilterList()}\n          classes={buttonClasses}\n          {...props}\n          onClick={this.onClick}\n        />\n        {!app.amp && (\n          <Drawer\n            ModalProps={{\n              keepMounted: true\n            }}\n            classes={{ paper: classes.drawer }}\n            anchor=\"bottom\"\n            title={\n              <Hbox justifyContent=\"center\">\n                <div>{title}</div>\n                {hideClearLink || model.filters.length === 0 ? null : (\n                  <button\n                    className={classnames({\n                      [clear]: true,\n                      [clearDisabled]: model.loading\n                    })}\n                    onClick={() => !model.loading && model.clearAllFilters()}\n                  >\n                    {clearLinkText}\n                  </button>\n                )}\n              </Hbox>\n            }\n            open={open}\n            onRequestClose={this.toggleOpen.bind(this, false)}\n          >\n            {mountDrawer && (\n              <Filter model={model} onViewResultsClick={this.onViewResultsClick} {...drawerProps} />\n            )}\n          </Drawer>\n        )}\n      </Fragment>\n    )\n  }\n\n  onClick = e => {\n    if (this.props.onClick) {\n      this.props.onClick(e)\n    }\n\n    if (!e.defaultPrevented) {\n      this.toggleOpen(true)\n    }\n  }\n\n  toggleOpen = open => {\n    this.setState({ open })\n\n    if (open) {\n      this.setState({ mountDrawer: true, open: true })\n    } else {\n      this.setState({ open: false })\n    }\n  }\n\n  onViewResultsClick = () => {\n    this.toggleOpen(false)\n  }\n\n  getFilterList = () => {\n    const { filters, facetGroups } = this.props.model\n\n    if (!filters || !facetGroups) return null\n    if (filters.length > 1) return `${filters.length} selected`\n\n    const names = []\n    const selection = {}\n\n    for (let facet of filters) {\n      selection[facet] = true\n    }\n\n    for (let group of facetGroups) {\n      for (let facet of group.facets) {\n        if (selection[facet.code]) {\n          names.push(facet.name)\n        }\n      }\n    }\n\n    return names.length ? names.join(', ') : null\n  }\n}\n",
    description:
      'A button that when clicked, opens a drawer containing the `Filter` view. Current filters\nare displayed in the button text.',
    displayName: 'FilterButton',
    methods: [
      {
        name: 'onClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      },
      {
        name: 'toggleOpen',
        docblock: null,
        modifiers: [],
        params: [{ name: 'open', type: null }],
        returns: null
      },
      { name: 'onViewResultsClick', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'getFilterList', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'model',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'An instance of `SearchResultModelBase`'
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'drawerProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props for the underlying `Filter` component',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'title',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The label for the button and the drawer header.  Defaults to "Filter".',
          defaultValue: { value: "'Filter'", computed: false }
        }
      },
      {
        name: 'hideClearLink',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to hide the clear link that is shown by default when one or more filters\nis selected.  Defaults to false.',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'clearLinkText',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'Text for the clear link.  Defaults to "clear all".',
          defaultValue: { value: "'clear all'", computed: false }
        }
      }
    ],
    styles: { classes: ['clear', 'clearDisabled', 'drawer'], name: 'RSFFilterButton' }
  },
  HeaderLogo: {
    id: 'HeaderLogo',
    filename: 'HeaderLogo',
    importPath: 'HeaderLogo',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport Link from './Link'\nimport { withStyles } from '@material-ui/core/'\nimport Track from './Track'\nimport classnames from 'classnames'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  logoWrap: {\n    position: 'absolute',\n    left: '50%',\n    width: '120px',\n    marginLeft: 'calc(-120px/2)',\n    height: '100%',\n    display: 'flex',\n    alignItems: 'center',\n\n    '& svg': {\n      width: '100%',\n      height: '100%'\n    },\n\n    [theme.breakpoints.up('md')]: {\n      position: 'relative',\n      left: 0,\n      marginLeft: 10\n    }\n  },\n\n  altText: {\n    visibility: 'collapse',\n    position: 'absolute'\n  }\n})\n\n/**\n * A wrapper for the logo in the app header which automatically links to the home page and fires\n * the logo_clicked analytics event\n *\n * Usage:\n *\n *  import MyLogo from '/path/to/logo.svg'\n *\n *  <HeaderLogo>\n *    <MyLogo/>\n *  </HeaderLogo>\n *\n */\n@withStyles(styles, { name: 'RSFHeaderLogo' })\nexport default class HeaderLogo extends Component {\n  static propTypes = {\n    /**\n     * The alt text to use for accessibility.  Defaults to \"brand logo\"\n     */\n    alt: PropTypes.string\n  }\n\n  static defaultProps = {\n    alt: 'brand logo'\n  }\n\n  render() {\n    const { classes, children, alt } = this.props\n\n    return (\n      <Track event=\"logoClicked\">\n        <Link to=\"/\" className={classnames(classes.logoWrap)}>\n          <span className={classes.altText}>{alt}</span>\n          {children}\n        </Link>\n      </Track>\n    )\n  }\n}\n",
    description:
      "A wrapper for the logo in the app header which automatically links to the home page and fires\nthe logo_clicked analytics event\n\nUsage:\n\n import MyLogo from '/path/to/logo.svg'\n\n <HeaderLogo>\n   <MyLogo/>\n </HeaderLogo>",
    displayName: 'HeaderLogo',
    methods: [],
    props: [
      {
        name: 'alt',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The alt text to use for accessibility.  Defaults to "brand logo"',
          defaultValue: { value: "'brand logo'", computed: false }
        }
      }
    ],
    styles: { classes: ['logoWrap', 'altText'], name: 'RSFHeaderLogo' }
  },
  Image: {
    id: 'Image',
    filename: 'Image',
    importPath: 'Image',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, createRef } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport PropTypes from 'prop-types'\nimport { inject } from 'mobx-react'\nimport classnames from 'classnames'\nimport VisibilitySensor from 'react-visibility-sensor'\n\nexport const styles = theme => ({\n  root: {\n    position: 'relative',\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n    // Without a minimum height, the container will not fire\n    // the visibility change\n    minHeight: 1\n  },\n  fit: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    display: 'block',\n    width: '100%',\n    height: '100%'\n  },\n  contain: {\n    '& img': {\n      objectFit: 'contain',\n      maxHeight: '100%',\n      maxWidth: '100%'\n    }\n  },\n  fill: {\n    '& img': {\n      display: 'block',\n      objectFit: 'contain',\n      maxHeight: '100%',\n      maxWidth: '100%',\n      width: '100%',\n      height: '100%'\n    }\n  }\n})\n\n/**\n * Provide amp-compatible mobile-optimized images that can be made to auto-scale to fit the parent element\n * by setting the `fill` prop, or grow/shrink while maintaining a given aspect ratio\n * by setting the `aspectRatio` prop.\n */\n@withStyles(styles, { name: 'RSFImage' })\n@inject(({ app }) => ({ amp: app.amp }))\nexport default class Image extends Component {\n  static propTypes = {\n    /**\n     * The URL for the image\n     */\n    src: PropTypes.string,\n\n    /**\n     * The URL of the image to use in case the primary image fails to load\n     */\n    notFoundSrc: PropTypes.string,\n\n    /**\n     * The ratio of height/width as a float.  For example: 1 when the height and width match,\n     * 0.5 when height is half of the width.\n     */\n    aspectRatio: PropTypes.number,\n\n    /**\n     * The quality of image to retreive from 0 to 100\n     */\n    quality: PropTypes.number,\n\n    /**\n     * Set to true to apply object-fit:contain to the image so that it automatically\n     * fits within the element's height and width.\n     */\n    contain: PropTypes.bool,\n\n    /**\n     * The same as contain, except images are stretched to fill the element's height and width.\n     */\n    fill: PropTypes.bool,\n\n    /**\n     * Set to true to wait until the image enters the viewport before loading it.\n     */\n    lazy: PropTypes.bool,\n\n    /**\n     * Sets the minimum amount of pixels the image can be scrolled out of view before it\n     * is lazy loaded.  Defaults to 100.  You must set `lazy` in order for this setting to take effect.\n     */\n    lazyOffset: PropTypes.number\n  }\n\n  static defaultProps = {\n    quality: null,\n    contain: false,\n    fill: false,\n    lazy: false,\n    lazyOffset: 100\n  }\n\n  constructor({ lazy, amp }) {\n    super()\n\n    this.state = {\n      loaded: !lazy || amp,\n      primaryNotFound: false\n    }\n\n    this.ref = createRef()\n  }\n\n  componentDidMount() {\n    const img = this.ref.current\n\n    if (img && img.complete && img.naturalWidth === 0) {\n      this.handleNotFound()\n    }\n  }\n\n  render() {\n    let {\n      lazy,\n      lazyOffset,\n      notFoundSrc,\n      height,\n      width,\n      quality,\n      amp,\n      fill,\n      contain,\n      classes,\n      className,\n      aspectRatio,\n      alt,\n      src,\n      ...imgAttributes\n    } = this.props\n    const { loaded, primaryNotFound } = this.state\n\n    contain = contain || aspectRatio\n\n    // Overiding `src` prop if `quality` was set\n    src = this.getOptimizedSrc()\n\n    if (primaryNotFound) {\n      src = notFoundSrc\n    }\n\n    const assignedAttributes = {\n      src,\n      key: src,\n      [amp ? 'class' : 'className']: classnames({\n        [classes.fit]: aspectRatio != null\n      }),\n      layout: amp ? this.ampLayout() : null,\n      height,\n      width,\n      alt\n    }\n\n    let result = (\n      <div\n        className={classnames(className, {\n          [classes.root]: true,\n          [classes.contain]: contain,\n          [classes.fill]: fill\n        })}\n      >\n        {aspectRatio && <div style={{ paddingTop: `${aspectRatio}%` }} />}\n        {amp ? (\n          <amp-img {...assignedAttributes} />\n        ) : (\n          loaded && (\n            <img\n              ref={this.ref}\n              {...assignedAttributes}\n              {...imgAttributes}\n              onError={this.handleNotFound}\n            />\n          )\n        )}\n      </div>\n    )\n\n    if (!amp && lazy) {\n      result = (\n        <VisibilitySensor\n          active={!loaded}\n          onChange={this.lazyLoad}\n          partialVisibility\n          offset={{ top: -lazyOffset, bottom: -lazyOffset }}\n        >\n          {result}\n        </VisibilitySensor>\n      )\n    }\n\n    return result\n  }\n\n  ampLayout() {\n    const { fill, contain, aspectRatio } = this.props\n\n    if (contain || fill || aspectRatio) {\n      return 'fill'\n    } else {\n      return 'intrinsic'\n    }\n  }\n\n  handleNotFound = () => {\n    this.setState({ primaryNotFound: true })\n  }\n\n  lazyLoad = visible => {\n    if (!this.state.loaded && visible) {\n      this.setState({ loaded: true })\n    }\n  }\n\n  getOptimizedSrc() {\n    const { src, quality } = this.props\n\n    if (quality) {\n      return `https://opt.moovweb.net/?quality=${encodeURIComponent(\n        quality\n      )}&img=${encodeURIComponent(src)}`\n    } else {\n      return src\n    }\n  }\n}\n",
    description:
      'Provide amp-compatible mobile-optimized images that can be made to auto-scale to fit the parent element\nby setting the `fill` prop, or grow/shrink while maintaining a given aspect ratio\nby setting the `aspectRatio` prop.',
    displayName: 'Image',
    methods: [
      { name: 'ampLayout', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'handleNotFound', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'lazyLoad',
        docblock: null,
        modifiers: [],
        params: [{ name: 'visible', type: null }],
        returns: null
      },
      { name: 'getOptimizedSrc', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'notFoundSrc',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The URL of the image to use in case the primary image fails to load'
        }
      },
      {
        name: 'aspectRatio',
        props: {
          type: { name: 'number' },
          required: false,
          description:
            'The ratio of height/width as a float.  For example: 1 when the height and width match,\n0.5 when height is half of the width.'
        }
      },
      {
        name: 'quality',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The quality of image to retreive from 0 to 100',
          defaultValue: { value: 'null', computed: false }
        }
      },
      {
        name: 'contain',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            "Set to true to apply object-fit:contain to the image so that it automatically\nfits within the element's height and width.",
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'fill',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            "The same as contain, except images are stretched to fill the element's height and width.",
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'lazy',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to wait until the image enters the viewport before loading it.',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'lazyOffset',
        props: {
          type: { name: 'number' },
          required: false,
          description:
            'Sets the minimum amount of pixels the image can be scrolled out of view before it\nis lazy loaded.  Defaults to 100.  You must set `lazy` in order for this setting to take effect.',
          defaultValue: { value: '100', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'fit', 'contain', 'fill'], name: 'RSFImage' }
  },
  ImageSwitcher: {
    id: 'ImageSwitcher',
    filename: 'ImageSwitcher',
    importPath: 'ImageSwitcher',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport SwipeableViews from 'react-swipeable-views'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport ChevronLeft from '@material-ui/icons/ChevronLeft'\nimport ChevronRight from '@material-ui/icons/ChevronRight'\nimport IconButton from '@material-ui/core/IconButton'\nimport Portal from '@material-ui/core/Portal'\nimport { fade } from '@material-ui/core/styles/colorManipulator'\nimport classnames from 'classnames'\nimport { ReactPinchZoomPan } from 'react-pinch-zoom-pan'\nimport TabsRow from './TabsRow'\nimport analytics from './analytics'\nimport { inject, observer } from 'mobx-react'\nimport AmpImageSwitcher from './amp/AmpImageSwitcher'\nimport LoadMask from './LoadMask'\nimport Image from './Image'\n\nconst paletteIconTextColor = '#77726D'\n\nconst imagePropType = PropTypes.shape({\n  src: PropTypes.string.isRequired,\n  alt: PropTypes.string\n})\n\nexport const styles = theme => ({\n  root: {\n    display: 'flex',\n    flexDirection: 'column',\n    position: 'relative',\n\n    '& img': {\n      display: 'block'\n    }\n  },\n\n  swipeWrap: {\n    position: 'relative',\n    overflow: 'hidden',\n    flex: 1,\n    '& .react-swipeable-view-container, & > div:first-child': {\n      height: '100%'\n    }\n  },\n\n  imageWrap: {\n    height: '100%',\n    width: '100%',\n    display: 'flex',\n    justifyContent: 'center',\n    alignItems: 'stretch',\n    '& img': {\n      maxHeight: '100%',\n      maxWidth: '100%',\n      objectFit: 'contain'\n    }\n  },\n\n  thumbsTitle: {\n    textTransform: 'uppercase'\n  },\n\n  productThumb: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0\n  },\n\n  thumbs: {\n    marginTop: `${theme.margins.container}px`\n  },\n\n  thumbnail: {\n    paddingBottom: '8px',\n    margin: '0 2px',\n    boxSizing: 'content-box',\n    height: '50px',\n    width: '50px'\n  },\n\n  activeThumbs: {\n    position: 'absolute',\n    width: '100%',\n    bottom: '20px'\n  },\n\n  selected: {\n    borderColor: '#D0D0D0'\n  },\n\n  arrows: {\n    [theme.breakpoints.down('xs')]: {\n      display: 'none'\n    }\n  },\n\n  arrow: {\n    position: 'absolute',\n    top: '50%',\n    marginTop: '-24px'\n  },\n\n  leftArrow: {\n    left: 0\n  },\n\n  rightArrow: {\n    right: 0\n  },\n\n  icon: {\n    height: '30px',\n    width: '30px'\n  },\n\n  dot: {\n    backgroundColor: fade(theme.palette.text.primary, 0.25),\n    width: 8,\n    height: 8,\n    borderWidth: '1px',\n    borderStyle: 'solid',\n    borderColor: theme.palette.background.paper,\n    borderRadius: '50%',\n    display: 'inline-block',\n    margin: '0 2px',\n    // Same duration as SwipeableViews animation\n    transitionDuration: '0.35s'\n  },\n\n  dotSelected: {\n    backgroundColor: theme.palette.text.primary\n  },\n\n  dots: {\n    position: 'absolute',\n    bottom: '5px',\n    textAlign: 'center',\n    width: '100%'\n  },\n\n  viewerToggle: {\n    transform: 'scale(0.4)',\n    position: 'absolute',\n    top: 0,\n    right: 0,\n    background: fade(theme.palette.text.icon || paletteIconTextColor, 0.4),\n    borderRadius: '50%',\n    width: '100px',\n    height: '100px',\n    transitionDuration: '0.5s',\n    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'\n  },\n\n  viewerActive: {\n    transform: 'scale(0.4) rotateZ(45deg)'\n  },\n\n  viewerOverlay: {\n    position: 'fixed',\n    top: 0,\n    left: 0,\n    width: '100%',\n    height: '100%',\n    background: theme.palette.background.paper,\n    zIndex: 9999,\n    transitionDuration: '0.5s',\n    transform: 'translateY(100%)',\n    visibility: 'hidden', // prevents lightbox from showing near the bottom of screen when browser controls hide on ios\n    '& img': {\n      margin: 'auto',\n      maxHeight: '100%',\n      maxWidth: '100%'\n    },\n    // Hack to fix root div height of pan/zoom/pinch container\n    '& > div:first-child': {\n      height: '100%'\n    }\n  },\n\n  viewerOverlayActive: {\n    transform: 'translateY(0%)',\n    visibility: 'visible'\n  },\n\n  tabsRowRoot: {\n    boxShadow: 'none'\n  },\n\n  tabScroller: {\n    [theme.breakpoints.down('xs')]: {\n      padding: `0 ${theme.margins.container}px`\n    }\n  },\n\n  indicator: {\n    display: 'none'\n  },\n\n  mask: {\n    opacity: '0.8'\n  }\n})\n\n/**\n * A swipeable image selector suitable for PDPs\n */\n@withStyles(styles, { name: 'RSFImageSwitcher' })\n@inject('app')\n@observer\nexport default class ImageSwitcher extends Component {\n  static propTypes = {\n    /**\n     * If specified, then the image_switched analytics event will be\n     * fired when an image is selected and the product's images and thumbnails will\n     * automatically be displayed.\n     */\n    product: PropTypes.object,\n\n    /**\n     * An array of (URL or image object) for the full size images\n     */\n    images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, imagePropType])).isRequired,\n\n    /**\n     * An array of thumbnails to display below the main image.  You can also\n     * specify `false` to hide the thumbnails entirely.\n     */\n    thumbnails: PropTypes.oneOfType([\n      PropTypes.bool,\n      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, imagePropType]))\n    ]),\n\n    /**\n     * Display left/right arrows for navigating through images\n     */\n    arrows: PropTypes.bool,\n\n    /**\n     * Display indicator dots at the bottom of the component\n     */\n    indicators: PropTypes.bool,\n\n    /**\n     * Optional title for thumbnails block\n     */\n    thumbnailsTitle: PropTypes.string,\n\n    /*\n     * Option to show thumbnails only when zoomed view is active\n     */\n    viewerThumbnailsOnly: PropTypes.bool,\n\n    /**\n     * Props to apply to the Image component used to display the product thumbnail while\n     * the product data is loading\n     */\n    loadingThumbnailProps: PropTypes.object,\n\n    /*\n     * Option to manually set the selected index\n     */\n    selectedIndex: PropTypes.number,\n\n    /**\n     * The URL of image to load if an image fails to load\n     */\n    notFoundSrc: PropTypes.string,\n\n    /**\n     * Config options for the image viewer\n     */\n    reactPinchZoomPanOptions: PropTypes.shape({\n      onPinchStart: PropTypes.func,\n      onPinchStop: PropTypes.func,\n      initialScale: PropTypes.number,\n      maxScale: PropTypes.number\n    })\n  }\n\n  static defaultProps = {\n    images: [],\n    thumbnails: [],\n    viewerThumbnailsOnly: false,\n    arrows: true,\n    indicators: false,\n    loadingThumbnailProps: {},\n    reactPinchZoomPanOptions: {\n      maxScale: 3\n    }\n  }\n\n  state = {\n    selectedIndex: 0,\n    productId: null,\n    viewerActive: false\n  }\n\n  static getDerivedStateFromProps(nextProps, prevState) {\n    const { product } = nextProps\n    const { productId } = prevState\n\n    if (\n      typeof nextProps.selectedIndex === 'number' &&\n      nextProps.selectedIndex !== prevState.selectedIndex\n    ) {\n      // update the selectedIndex state if a new prop value is passed in\n      return { selectedIndex: nextProps.selectedIndex }\n    } else if (product && product.id !== productId) {\n      // reset the selectedIndex state if the product changes\n      return { productId: product.id, selectedIndex: 0 }\n    } else {\n      return null\n    }\n  }\n\n  renderViewerToggle() {\n    return (\n      <div\n        onClick={() => this.toggleViewer()}\n        className={classnames(this.props.classes.viewerToggle, {\n          [this.props.classes.viewerActive]: this.state.viewerActive\n        })}\n      >\n        <svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\">\n          <line x1=\"50\" y1=\"25\" x2=\"50\" y2=\"75\" strokeWidth=\"4\" stroke=\"white\" />\n          <line x1=\"25\" y1=\"50\" x2=\"75\" y2=\"50\" strokeWidth=\"4\" stroke=\"white\" />\n        </svg>\n      </div>\n    )\n  }\n\n  toggleViewer() {\n    if (this.state.viewerActive) {\n      document.body.classList.remove('moov-modal')\n    } else {\n      document.body.classList.add('moov-modal')\n    }\n\n    this.setState({ viewerActive: !this.state.viewerActive })\n  }\n\n  renderDot(index) {\n    const classes = classnames(this.props.classes.dot, {\n      [this.props.classes.dotSelected]: index === this.state.selectedIndex\n    })\n    return <div key={index} className={classes} />\n  }\n\n  get thumbnails() {\n    const { thumbnails, product } = this.props\n    if (thumbnails === false) return []\n    const _thumbnails =\n      thumbnails && thumbnails.length ? thumbnails : (product && product.thumbnails) || []\n    return _thumbnails.map(e => {\n      return typeof e === 'string' ? { src: e, alt: 'thumbnail' } : e\n    })\n  }\n\n  get images() {\n    const { images, product } = this.props\n    const _images = images && images.length ? images : (product && product.images) || []\n    return _images.map(e => {\n      return typeof e === 'string' ? { src: e, alt: 'product' } : e\n    })\n  }\n\n  renderThumbnails() {\n    const { classes, thumbnailsTitle, notFoundSrc } = this.props\n    const { thumbnails } = this\n    const modifiedThumbs = thumbnails && thumbnails.map(({ src, alt }) => ({ imageUrl: src, alt }))\n    const { viewerActive, selectedIndex } = this.state\n\n    return (\n      thumbnails &&\n      thumbnails.length > 0 && (\n        <div className={classnames(classes.thumbs, { [classes.activeThumbs]: viewerActive })}>\n          <div className=\"field\">\n            <label className={classes.thumbsTitle}>{thumbnailsTitle}</label>\n          </div>\n          <TabsRow\n            classes={{\n              scroller: classes.tabScroller,\n              root: classes.tabsRowRoot\n            }}\n            imageProps={{\n              className: classes.thumbnail,\n              notFoundSrc,\n              fill: true\n            }}\n            centered\n            initialSelectedIdx={selectedIndex}\n            onTabChange={(e, selectedIndex) => this.setState({ selectedIndex })}\n            items={modifiedThumbs}\n          />\n        </div>\n      )\n    )\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (\n      prevState &&\n      prevState.selectedIndex &&\n      prevState.selectedIndex !== this.state.selectedIndex &&\n      this.props.product\n    ) {\n      analytics.fire('imageSwitched', {\n        product: this.props.product,\n        imageUrl: this.props.images[this.state.selectedIndex]\n      })\n    }\n  }\n\n  render() {\n    let {\n      app,\n      product,\n      classes,\n      className,\n      arrows,\n      indicators,\n      style,\n      reactPinchZoomPanOptions,\n      loadingThumbnailProps,\n      viewerThumbnailsOnly,\n      notFoundSrc\n    } = this.props\n    const { images, thumbnails } = this\n\n    if (app.amp)\n      return (\n        <AmpImageSwitcher\n          images={images}\n          thumbnails={thumbnails}\n          className={className}\n          classes={{\n            root: classes.root,\n            dot: classes.dot,\n            dots: classes.dots,\n            dotSelected: classes.dotSelected,\n            thumbnails: classes.thumbs\n          }}\n          arrows={arrows}\n          indicators={indicators}\n          thumbnails={viewerThumbnailsOnly ? null : this.thumbnails}\n        />\n      )\n\n    const { selectedIndex, viewerActive } = this.state\n    const selectedImage = images[selectedIndex]\n\n    return (\n      <div className={classnames(className, classes.root)} style={style}>\n        {/* Full Size Images */}\n        <div className={classes.swipeWrap}>\n          <SwipeableViews\n            index={selectedIndex}\n            onChangeIndex={i => this.setState({ selectedIndex: i })}\n          >\n            {images.map(({ src, alt }, i) => (\n              <div key={i} className={classes.imageWrap}>\n                {app.amp ? (\n                  <amp-img src={src} alt=\"product\" layout=\"fill\" />\n                ) : (\n                  <Image\n                    key={src}\n                    notFoundSrc={notFoundSrc}\n                    src={i === 0 && app.loading ? null : src} // need to clear src when app.loading is true so that the onLoad event will fire and the loading thumbnail will be removed\n                    alt={alt || 'product'}\n                    onLoad={i === 0 ? this.clearLoadingProduct : null}\n                  />\n                )}\n              </div>\n            ))}\n          </SwipeableViews>\n\n          {arrows && (\n            <div className={classes.arrows}>\n              {selectedIndex !== 0 && (\n                <IconButton\n                  className={classnames(classes.arrow, classes.leftArrow)}\n                  onClick={() => this.setState({ selectedIndex: selectedIndex - 1 })}\n                >\n                  <ChevronLeft classes={{ root: classes.icon }} />\n                </IconButton>\n              )}\n              {selectedIndex !== images.length - 1 && (\n                <IconButton\n                  className={classnames(classes.arrow, classes.rightArrow)}\n                  onClick={() => this.setState({ selectedIndex: selectedIndex + 1 })}\n                >\n                  <ChevronRight classes={{ root: classes.icon }} />\n                </IconButton>\n              )}\n            </div>\n          )}\n\n          {indicators && (\n            <div className={classes.dots}>{images.map((_, index) => this.renderDot(index))}</div>\n          )}\n\n          {product && <LoadMask show={product.loadingImages} className={classes.mask} />}\n\n          {product && app.loadingProduct && app.loadingProduct.thumbnail && (\n            <Image\n              src={app.loadingProduct.thumbnail}\n              className={classes.productThumb}\n              {...loadingThumbnailProps}\n              fill\n            />\n          )}\n\n          <Portal>\n            <div\n              className={classnames(classes.viewerOverlay, {\n                [classes.viewerOverlayActive]: viewerActive\n              })}\n            >\n              <ReactPinchZoomPan\n                {...reactPinchZoomPanOptions}\n                render={obj => {\n                  return (\n                    <div\n                      style={{\n                        overflow: 'hidden',\n                        position: 'relative',\n                        height: '100%'\n                      }}\n                    >\n                      <div\n                        style={{\n                          display: 'flex',\n                          height: '100%'\n                        }}\n                      >\n                        {selectedImage && (\n                          <img\n                            src={selectedImage.src}\n                            alt={selectedImage.alt}\n                            style={{\n                              width: '100%',\n                              height: 'auto',\n                              transform: `scale(${obj.scale}) translateY(${obj.y}px) translateX(${\n                                obj.x\n                              }px)`\n                            }}\n                          />\n                        )}\n                      </div>\n                    </div>\n                  )\n                }}\n              />\n              {viewerActive && this.renderViewerToggle()}\n              {viewerActive && this.renderThumbnails()}\n            </div>\n          </Portal>\n          {!viewerActive && this.renderViewerToggle()}\n        </div>\n\n        {!viewerActive && !viewerThumbnailsOnly && this.renderThumbnails()}\n      </div>\n    )\n  }\n\n  clearLoadingProduct = () => {\n    this.props.app.applyState({ loadingProduct: null })\n  }\n}\n",
    description: 'A swipeable image selector suitable for PDPs',
    displayName: 'ImageSwitcher',
    methods: [
      {
        name: 'getDerivedStateFromProps',
        docblock: null,
        modifiers: ['static'],
        params: [{ name: 'nextProps', type: null }, { name: 'prevState', type: null }],
        returns: null
      },
      { name: 'renderViewerToggle', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'toggleViewer', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'renderDot',
        docblock: null,
        modifiers: [],
        params: [{ name: 'index', type: null }],
        returns: null
      },
      { name: 'thumbnails', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'images', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'renderThumbnails', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'clearLoadingProduct', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'product',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            "If specified, then the image_switched analytics event will be\nfired when an image is selected and the product's images and thumbnails will\nautomatically be displayed."
        }
      },
      {
        name: 'images',
        props: {
          type: {
            name: 'arrayOf',
            value: {
              name: 'union',
              value: [{ name: 'string' }, { name: 'custom', raw: 'imagePropType' }]
            }
          },
          required: false,
          description: 'An array of (URL or image object) for the full size images',
          defaultValue: { value: '[]', computed: false }
        }
      },
      {
        name: 'thumbnails',
        props: {
          type: {
            name: 'union',
            value: [
              { name: 'bool' },
              {
                name: 'arrayOf',
                value: {
                  name: 'union',
                  value: [{ name: 'string' }, { name: 'custom', raw: 'imagePropType' }]
                }
              }
            ]
          },
          required: false,
          description:
            'An array of thumbnails to display below the main image.  You can also\nspecify `false` to hide the thumbnails entirely.',
          defaultValue: { value: '[]', computed: false }
        }
      },
      {
        name: 'arrows',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Display left/right arrows for navigating through images',
          defaultValue: { value: 'true', computed: false }
        }
      },
      {
        name: 'indicators',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Display indicator dots at the bottom of the component',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'thumbnailsTitle',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'Optional title for thumbnails block'
        }
      },
      {
        name: 'viewerThumbnailsOnly',
        props: {
          type: { name: 'bool' },
          required: false,
          description: '',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'loadingThumbnailProps',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            'Props to apply to the Image component used to display the product thumbnail while\nthe product data is loading',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'selectedIndex',
        props: { type: { name: 'number' }, required: false, description: '' }
      },
      {
        name: 'notFoundSrc',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The URL of image to load if an image fails to load'
        }
      },
      {
        name: 'reactPinchZoomPanOptions',
        props: {
          type: {
            name: 'shape',
            value: {
              onPinchStart: { name: 'func', required: false },
              onPinchStop: { name: 'func', required: false },
              initialScale: { name: 'number', required: false },
              maxScale: { name: 'number', required: false }
            }
          },
          required: false,
          description: 'Config options for the image viewer',
          defaultValue: { value: '{\n  maxScale: 3\n}', computed: false }
        }
      }
    ],
    styles: {
      classes: [
        'root',
        'swipeWrap',
        'imageWrap',
        'thumbsTitle',
        'productThumb',
        'thumbs',
        'thumbnail',
        'activeThumbs',
        'selected',
        'arrows',
        'arrow',
        'leftArrow',
        'rightArrow',
        'icon',
        'dot',
        'dotSelected',
        'dots',
        'viewerToggle',
        'viewerActive',
        'viewerOverlay',
        'viewerOverlayActive',
        'tabsRowRoot',
        'tabScroller',
        'indicator',
        'mask'
      ],
      name: 'RSFImageSwitcher'
    }
  },
  Link: {
    id: 'Link',
    filename: 'Link',
    importPath: 'Link',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { inject } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport { relativeURL, absoluteURL, canUseClientSideNavigation } from './utils/url'\nimport { prefetchJsonFor } from './router/serviceWorker'\nimport VisibilitySensor from 'react-visibility-sensor'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport classnames from 'classnames'\nimport dataProps from './utils/dataProps'\n\nexport const styles = {\n  root: {}\n}\n\n@withStyles(styles, { name: 'RSFLink' })\n@inject(({ history, router, app }) => ({ history, router, location: app.location }))\nexport default class Link extends Component {\n  prefetched = false\n\n  static propTypes = {\n    /**\n     * The path to navigate to when the link is clicked\n     */\n    to: PropTypes.string,\n\n    /**\n     * Data to assign to the history state\n     */\n    state: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),\n\n    /**\n     * Set to true to force server side navigation.  Defaults to false\n     */\n    server: PropTypes.bool,\n\n    /**\n     * Set to \"visible\" to prefetch linked page data when the link is scrolled into view.\n     * Set to \"always\" to prefetch even when the link is hidden.\n     */\n    prefetch: PropTypes.oneOf(['always', 'visible']),\n\n    /**\n     * Set this prop to prefetch a URL other than the one specified in the to prop\n     */\n    prefetchURL: PropTypes.string,\n\n    /**\n     * A function to call when the link is clicked.\n     */\n    onClick: PropTypes.func,\n\n    /**\n     * Props to apply to the underlying html anchor element\n     */\n    anchorProps: PropTypes.object,\n\n    /**\n     * A function to call when the link becomes visible\n     */\n    onVisible: PropTypes.func\n  }\n\n  static defaultProps = {\n    anchorProps: {}\n  }\n\n  constructor() {\n    super()\n    this.el = React.createRef()\n  }\n\n  componentDidMount() {\n    const { prefetch } = this.props\n\n    if (prefetch === 'always') {\n      this.prefetch()\n    }\n  }\n\n  componentDidUpdate() {\n    if (this.prefetched !== this.urlToPrefetch()) {\n      // reset prefetched state if the prefetch url changes\n      this.prefetched = null\n    }\n  }\n\n  prefetch() {\n    const url = this.urlToPrefetch()\n\n    if (this.prefetched !== url) {\n      prefetchJsonFor(url)\n      this.prefetched = url\n    }\n  }\n\n  urlToPrefetch() {\n    return this.props.prefetchURL || this.props.to\n  }\n\n  render() {\n    const {\n      anchorProps,\n      className,\n      style,\n      children,\n      prefetch,\n      to,\n      location,\n      onVisible,\n      ...others\n    } = this.props\n\n    // Here we don't provide the pathname on purpose.  Doing so would cause every link to rerender\n    // We used to do that and it caused a noticeable lag in the UI.\n    const href = location\n      ? absoluteURL(to, {\n          protocol: location.protocol,\n          hostname: location.hostname,\n          port: location.port\n        })\n      : to\n\n    const props = {\n      ...anchorProps,\n      ...dataProps(others),\n      'data-moov-link': 'on',\n      className: classnames(this.props.classes.root, className),\n      ref: this.el,\n      style,\n      onClick: this.onClick,\n      href\n    }\n\n    if (prefetch) {\n      props['data-moov-rel'] = 'prefetch'\n    }\n\n    const link = <a {...props}>{children}</a>\n\n    if (prefetch === 'visible' || onVisible) {\n      return (\n        <VisibilitySensor onChange={this.onVisibleChange} partialVisibility>\n          {link}\n        </VisibilitySensor>\n      )\n    } else {\n      return link\n    }\n  }\n\n  onVisibleChange = visible => {\n    const { prefetch, onVisible } = this.props\n\n    if (visible) {\n      const el = this.el.current\n\n      // Will get here if the link is on a hidden page\n      // for some reason the visibility sensor fires for all links on a page right after\n      // that page has been hidden.  We check el.offsetParent to make sure the link is truly visible\n      // see https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom for more info on this method\n      if (el.offsetParent != null) {\n        if (prefetch === 'visible') {\n          this.prefetch()\n        }\n\n        if (onVisible) {\n          onVisible()\n        }\n      }\n    }\n  }\n\n  onClick = e => {\n    let { server, onClick, to, state, history } = this.props\n\n    if (onClick) {\n      onClick(e)\n    }\n\n    if (typeof state === 'function') {\n      state = state()\n    }\n\n    const url = relativeURL(to)\n\n    if (!e.isDefaultPrevented() && !server && canUseClientSideNavigation(url, this.props.router)) {\n      e.preventDefault()\n\n      if (url === history.location.pathname + history.location.search) {\n        // return immediately if the url isn't changing.  Pushing the existing URL onto state will override the\n        // current state and going forward then back will yield a broken page.\n        return\n      }\n\n      if (this.props.history) {\n        this.props.history.push(url, state && state.toJSON ? state.toJSON() : state)\n      } else {\n        // Fallback to redirect\n        window.location.href = url\n      }\n    }\n  }\n}\n",
    description: '',
    displayName: 'Link',
    methods: [
      { name: 'prefetch', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'urlToPrefetch', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'onVisibleChange',
        docblock: null,
        modifiers: [],
        params: [{ name: 'visible', type: null }],
        returns: null
      },
      {
        name: 'onClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'to',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The path to navigate to when the link is clicked'
        }
      },
      {
        name: 'state',
        props: {
          type: { name: 'union', value: [{ name: 'object' }, { name: 'func' }] },
          required: false,
          description: 'Data to assign to the history state'
        }
      },
      {
        name: 'server',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to force server side navigation.  Defaults to false'
        }
      },
      {
        name: 'prefetch',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'always'", computed: false }, { value: "'visible'", computed: false }]
          },
          required: false,
          description:
            'Set to "visible" to prefetch linked page data when the link is scrolled into view.\nSet to "always" to prefetch even when the link is hidden.'
        }
      },
      {
        name: 'prefetchURL',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'Set this prop to prefetch a URL other than the one specified in the to prop'
        }
      },
      {
        name: 'onClick',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'A function to call when the link is clicked.'
        }
      },
      {
        name: 'anchorProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props to apply to the underlying html anchor element',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'onVisible',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'A function to call when the link becomes visible'
        }
      }
    ],
    styles: { classes: ['root'], name: 'RSFLink' }
  },
  LoadMask: {
    id: 'LoadMask',
    filename: 'LoadMask',
    importPath: 'LoadMask',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport CircularProgress from '@material-ui/core/CircularProgress'\nimport { withStyles } from '@material-ui/core/styles'\nimport classnames from 'classnames'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  root: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    display: 'none',\n    justifyContent: 'center',\n    alignItems: 'center',\n    background: theme.palette.background.default,\n    zIndex: 1\n  },\n  fullscreen: {\n    height: `calc(100vh - ${theme.headerHeight}px)`,\n    bottom: 'initial',\n    zIndex: theme.zIndex.appBar - 10,\n    'body.moov-amp &': {\n      position: 'fixed',\n      marginTop: 0,\n      opacity: 0.8\n    }\n  },\n  transparent: {\n    backgroundColor: 'rgba(255,255,255,0.5)'\n  },\n  alignTop: {\n    alignItems: 'flex-start',\n    paddingTop: '200px'\n  },\n  show: {\n    display: 'flex'\n  }\n})\n\n/**\n * The load mask displays when fetching data from the server.\n */\n@withStyles(styles, { name: 'RSFLoadMask' })\nexport default class LoadMask extends Component {\n  static propTypes = {\n    /**\n     * Set to true to display the load mask, otherwise it will be hidden.\n     * Defaults to false.\n     */\n    show: PropTypes.bool,\n\n    /**\n     * Set to true to toggle the overflow style on the body when showing.\n     * Defaults to false\n     */\n    fullscreen: PropTypes.bool,\n\n    /**\n     * Set to true to show the partially show the background through the load mask\n     */\n    transparent: PropTypes.bool,\n\n    /**\n     * Set to top to show the spinner near the top. Defaults to 'center'\n     */\n    align: PropTypes.oneOf(['center', 'top'])\n  }\n\n  static defaultProps = {\n    show: false,\n    fullscreen: false,\n    align: 'center'\n  }\n\n  componentDidUpdate() {\n    this.toggleOverflow()\n  }\n\n  componentDidMount() {\n    this.toggleOverflow()\n  }\n\n  toggleOverflow() {\n    if (this.props.fullscreen) {\n      if (this.props.show) {\n        document.body.style.overflow = 'hidden'\n      } else {\n        document.body.style.overflow = 'visible'\n      }\n    }\n  }\n\n  render() {\n    const { classes, show, style, className, children, fullscreen, transparent, align } = this.props\n\n    return (\n      <div\n        style={style}\n        className={classnames(classes.root, className, {\n          [classes.show]: show,\n          [classes.fullscreen]: fullscreen,\n          [classes.transparent]: transparent,\n          [classes.alignTop]: align === 'top'\n        })}\n      >\n        {children || <CircularProgress className={classes.progress} color=\"secondary\" />}\n      </div>\n    )\n  }\n\n  componentWillUnmount() {\n    document.body.style.overflow = 'visible'\n  }\n}\n",
    description: 'The load mask displays when fetching data from the server.',
    displayName: 'LoadMask',
    methods: [{ name: 'toggleOverflow', docblock: null, modifiers: [], params: [], returns: null }],
    props: [
      {
        name: 'show',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to display the load mask, otherwise it will be hidden.\nDefaults to false.',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'fullscreen',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to toggle the overflow style on the body when showing.\nDefaults to false',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'transparent',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to show the partially show the background through the load mask'
        }
      },
      {
        name: 'align',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'center'", computed: false }, { value: "'top'", computed: false }]
          },
          required: false,
          description: "Set to top to show the spinner near the top. Defaults to 'center'",
          defaultValue: { value: "'center'", computed: false }
        }
      }
    ],
    styles: {
      classes: ['root', 'fullscreen', 'transparent', 'alignTop', 'show'],
      name: 'RSFLoadMask'
    }
  },
  Menu: {
    id: 'Menu',
    filename: 'Menu',
    importPath: 'Menu',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport Drawer from '@material-ui/core/Drawer'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport classnames from 'classnames'\nimport AmpMenu from './amp/AmpMenu'\nimport withTheme from '@material-ui/core/styles/withTheme'\nimport Body from './menu/Body'\nimport SEOLinks from './menu/SEOLinks'\nimport MenuContext from './menu/MenuContext'\nimport AmpSimpleMenu from './amp/AmpSimpleMenu'\n\nexport { MenuModel, MenuItemModel } from './model/MenuModel'\n\nexport const styles = theme => ({\n  drawer: {\n    zIndex: theme.zIndex.modal + 20,\n    display: 'flex',\n    flexDirection: 'column',\n    borderTop: `${theme.headerHeight}px solid transparent`,\n    'body.moov-safari &': {\n      // Turning off momentum scrolling on iOS here to fix frozen body issue\n      // Source: https://moovweb.atlassian.net/browse/PRPL-342\n      '-webkit-overflow-scrolling': 'auto'\n    }\n  },\n\n  list: {\n    flex: 'none',\n    overflowY: 'auto',\n    overflowX: 'hidden',\n    maxHeight: '100%',\n    padding: 0\n  },\n\n  ampList: {\n    flex: 'none',\n    overflowX: 'hidden',\n    padding: 0\n  },\n\n  ampBody: {\n    overflowY: 'auto',\n    height: '100%',\n    left: 0,\n    top: 0,\n    position: 'absolute',\n    width: '100%',\n    flex: '1 1 0%',\n    transition: 'transform ease-out .2s'\n  },\n\n  hiddenLeft: {\n    transform: `translateX(-${theme.drawerWidth}px)`\n  },\n\n  hiddenRight: {\n    transform: `translateX(${theme.drawerWidth}px)`\n  },\n\n  inFocus: {\n    transform: 'translateX(0px)'\n  },\n\n  listPadding: {\n    padding: 0\n  },\n\n  header: {\n    position: 'absolute',\n    left: '10px',\n    top: '12px'\n  },\n\n  icon: {\n    marginRight: '0',\n    width: 24\n  },\n\n  headerText: {\n    textAlign: 'center',\n    fontWeight: '600',\n    textTransform: 'uppercase',\n    fontSize: theme.typography.body1.fontSize\n  },\n\n  hbox: {\n    display: 'flex',\n    flexDirection: 'row',\n    transition: 'all ease-out .2s'\n  },\n\n  hidden: {\n    display: 'none'\n  },\n\n  visible: {\n    display: 'block'\n  },\n\n  listItem: {\n    textTransform: 'uppercase',\n    lineHeight: 'initial',\n    fontSize: theme.typography.body1.fontSize\n  },\n\n  link: {\n    textDecoration: 'none',\n    color: 'inherit'\n  },\n\n  listItemImage: {\n    width: '40px',\n    height: '40px',\n    marginRight: 0\n  },\n\n  listItemIcon: {\n    marginRight: 0\n  },\n\n  expander: {\n    backgroundColor: `${theme.palette.primary.paper} !important`\n  },\n\n  leaf: {\n    textTransform: 'none',\n    ...theme.typography.body1\n  },\n\n  expanded: {\n    backgroundColor: `${theme.palette.secondary.main} !important`,\n    color: theme.palette.secondary.contrastText,\n    '& svg': {\n      color: theme.palette.secondary.contrastText\n    }\n  },\n\n  drawerFixed: {\n    top: 0,\n    height: '100vh',\n    borderTop: 'none'\n  },\n\n  modal: {}\n})\n\n/**\n * The main app menu that slides in from the left when the AppHeader's menu button is clicked.\n * Children are rendered above the list of menu items.\n *\n * In addition to the CSS classes that can be overridden of menu subcomponents, you can also\n * assign specific classes to individual menu items by specifying a value for the `className`\n * field on any instance of `MenuItemModel`.\n */\n@withTheme()\n@withStyles(styles, { name: 'RSFMenu' })\n@inject('app')\n@observer\nexport default class Menu extends Component {\n  static propTypes = {\n    menu: PropTypes.object,\n\n    /**\n     * The width of the drawer in pixels\n     */\n    drawerWidth: PropTypes.number,\n\n    /**\n     * An element to display at the top of the root of the menu\n     */\n    rootHeader: PropTypes.element,\n\n    /**\n     * An element to display at the bottom of the root of the menu\n     */\n    rootFooter: PropTypes.element,\n\n    /**\n     * Set to true to use expandable menu items below depth 1\n     */\n    useExpanders: PropTypes.bool,\n\n    /**\n     * Set to true to expand first item for not root items\n     */\n    expandFirstItem: PropTypes.bool,\n\n    /**\n     * Set to true to display the menu\n     */\n    open: PropTypes.bool,\n\n    /**\n     * Set to true to dock the menu so that it's always open and not modal\n     */\n    persistent: PropTypes.bool,\n\n    /**\n     * CSS classes for this component\n     */\n    classes: PropTypes.objectOf(PropTypes.string),\n\n    /**\n     * Called when the menu is closed\n     */\n    onClose: PropTypes.func,\n\n    /**\n     * Set to true to render a simple set of expanders rather than a multi-level drill down.\n     * Defaults to false.\n     */\n    simple: PropTypes.bool,\n\n    /**\n     * The icon to use for collapsed groups\n     */\n    ExpandIcon: PropTypes.func,\n\n    /**\n     * The icon to use for expanded groups\n     */\n    CollapseIcon: PropTypes.func,\n\n    /**\n     * Sets the side of the screen from which the menu appears.\n     */\n    align: PropTypes.oneOf(['left', 'right']),\n\n    /**\n     * A function to render the contents of a menu item.  It is passed the following arguments:\n     *\n     * 1.) item - the MenuItemModel instance.\n     * 2.) leaf - `true` when the item is a leaf node, otherwise `false`\n     *\n     * Return undefined to render the default contents\n     *\n     * Example:\n     *\n     *  itemRenderer={(item, leaf) => {\n     *    return leaf ? <ListItemText primary={item.text}/> : undefined\n     *  }}\n     */\n    itemRenderer: PropTypes.func,\n\n    /**\n     * Set to `true` to show the item corresponding to the current URL as selected.\n     */\n    trackSelected: PropTypes.bool\n  }\n\n  static defaultProps = {\n    drawerWidth: 330,\n    simple: false,\n    expandFirstItem: false,\n    align: 'left',\n    trackSelected: false\n  }\n\n  constructor({ classes }) {\n    super()\n    this.menuContext = { classes }\n  }\n\n  render() {\n    const {\n      app,\n      classes,\n      className,\n      align,\n      drawerWidth,\n      persistent,\n      simple,\n      ...others\n    } = this.props\n    const { amp, menu } = app\n\n    if (!menu) {\n      return null\n    } else if (amp) {\n      if (simple) {\n        return <AmpSimpleMenu {...this.props} />\n      } else {\n        return (\n          <MenuContext.Provider value={this.menuContext}>\n            <AmpMenu {...this.props} />\n          </MenuContext.Provider>\n        )\n      }\n    } else {\n      return (\n        <Fragment>\n          <Drawer\n            variant={persistent ? 'persistent' : 'temporary'}\n            open={menu.open || persistent}\n            onClose={menu.close}\n            anchor={align}\n            ModalProps={{\n              keepMounted: true\n            }}\n            PaperProps={{\n              style: { width: `${drawerWidth}px` }\n            }}\n            classes={{\n              root: className,\n              paper: classnames(classes.drawer, {\n                [classes.drawerFixed]: persistent\n              }),\n              modal: classes.modal\n            }}\n          >\n            <MenuContext.Provider value={this.menuContext}>\n              <Body drawerWidth={drawerWidth} simple={simple} {...others} />\n            </MenuContext.Provider>\n          </Drawer>\n          <SEOLinks />\n        </Fragment>\n      )\n    }\n  }\n}\n",
    description:
      "The main app menu that slides in from the left when the AppHeader's menu button is clicked.\nChildren are rendered above the list of menu items.\n\nIn addition to the CSS classes that can be overridden of menu subcomponents, you can also\nassign specific classes to individual menu items by specifying a value for the `className`\nfield on any instance of `MenuItemModel`.",
    displayName: 'Menu',
    methods: [],
    props: [
      { name: 'menu', props: { type: { name: 'object' }, required: false, description: '' } },
      {
        name: 'drawerWidth',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The width of the drawer in pixels',
          defaultValue: { value: '330', computed: false }
        }
      },
      {
        name: 'rootHeader',
        props: {
          type: { name: 'element' },
          required: false,
          description: 'An element to display at the top of the root of the menu'
        }
      },
      {
        name: 'rootFooter',
        props: {
          type: { name: 'element' },
          required: false,
          description: 'An element to display at the bottom of the root of the menu'
        }
      },
      {
        name: 'useExpanders',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to use expandable menu items below depth 1'
        }
      },
      {
        name: 'expandFirstItem',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to expand first item for not root items',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'open',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to display the menu'
        }
      },
      {
        name: 'persistent',
        props: {
          type: { name: 'bool' },
          required: false,
          description: "Set to true to dock the menu so that it's always open and not modal"
        }
      },
      {
        name: 'classes',
        props: {
          type: { name: 'objectOf', value: { name: 'string' } },
          required: false,
          description: 'CSS classes for this component'
        }
      },
      {
        name: 'onClose',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'Called when the menu is closed'
        }
      },
      {
        name: 'simple',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to render a simple set of expanders rather than a multi-level drill down.\nDefaults to false.',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'ExpandIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'The icon to use for collapsed groups'
        }
      },
      {
        name: 'CollapseIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'The icon to use for expanded groups'
        }
      },
      {
        name: 'align',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'left'", computed: false }, { value: "'right'", computed: false }]
          },
          required: false,
          description: 'Sets the side of the screen from which the menu appears.',
          defaultValue: { value: "'left'", computed: false }
        }
      },
      {
        name: 'itemRenderer',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            'A function to render the contents of a menu item.  It is passed the following arguments:\n\n1.) item - the MenuItemModel instance.\n2.) leaf - `true` when the item is a leaf node, otherwise `false`\n\nReturn undefined to render the default contents\n\nExample:\n\n itemRenderer={(item, leaf) => {\n   return leaf ? <ListItemText primary={item.text}/> : undefined\n }}'
        }
      },
      {
        name: 'trackSelected',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to `true` to show the item corresponding to the current URL as selected.',
          defaultValue: { value: 'false', computed: false }
        }
      }
    ],
    styles: {
      classes: [
        'drawer',
        'list',
        'ampList',
        'ampBody',
        'hiddenLeft',
        'hiddenRight',
        'inFocus',
        'listPadding',
        'header',
        'icon',
        'headerText',
        'hbox',
        'hidden',
        'visible',
        'listItem',
        'link',
        'listItemImage',
        'listItemIcon',
        'expander',
        'leaf',
        'expanded',
        'drawerFixed',
        'modal'
      ],
      name: 'RSFMenu'
    }
  },
  MenuIcon: {
    id: 'MenuIcon',
    filename: 'MenuIcon',
    importPath: 'MenuIcon',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { PureComponent, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport { withStyles } from '@material-ui/core'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\n\nexport const styles = theme => ({\n  root: {\n    position: 'relative',\n    height: '24px',\n    width: '24px',\n    boxSizing: 'border-box',\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'center',\n\n    '& .rsf-hamburger': {\n      display: 'block',\n      marginTop: '5px'\n    },\n\n    '& .rsf-hamburger-box': {\n      width: '20px',\n      height: '20px',\n      display: 'block',\n      position: 'relative'\n    },\n\n    '& .rsf-hamburger-inner': {\n      display: 'block',\n      top: '50%',\n      marginTop: '-4px'\n    },\n\n    '& .rsf-hamburger-inner, & .rsf-hamburger-inner::before, & .rsf-hamburger-inner::after': {\n      width: '20px',\n      height: '2px',\n      backgroundColor: theme.palette.text.secondary,\n      borderRadius: '4px',\n      position: 'absolute',\n      transitionProperty: 'transform',\n      transitionDuration: theme.transitions.duration.standard,\n      transitionTimingFunction: 'ease'\n    },\n\n    '& .rsf-hamburger-inner::before, & .rsf-hamburger-inner::after': {\n      content: '\"\"',\n      display: 'block'\n    },\n\n    '& .rsf-hamburger-inner::before': {\n      top: '-10px'\n    },\n\n    '& .rsf-hamburger-inner::after': {\n      bottom: '-10px'\n    },\n\n    '& .rsf-hamburger .rsf-hamburger-inner': {\n      top: '5px'\n    },\n\n    '& .rsf-hamburger .rsf-hamburger-inner::before': {\n      top: '5px',\n      transitionProperty: 'transform, opacity',\n      transitionTimingFunction: 'ease',\n      transitionDuration: theme.transitions.duration.standard\n    },\n\n    '& .rsf-hamburger .rsf-hamburger-inner::after': {\n      top: '10px'\n    }\n  },\n\n  active: {\n    '& .rsf-hamburger .rsf-hamburger-inner': {\n      transform: 'translate3d(0, 5px, 0) rotate(45deg)'\n    },\n\n    '& .rsf-hamburger .rsf-hamburger-inner::before': {\n      transform: 'rotate(-45deg) translate3d(-5.71429px, -5px, 0)',\n      opacity: 0\n    },\n\n    '& .rsf-hamburger .rsf-hamburger-inner::after': {\n      transform: 'translate3d(0, -10px, 0) rotate(-90deg)'\n    }\n  },\n\n  withLabel: {\n    '& .rsf-hamburger': {\n      marginTop: '0'\n    }\n  },\n\n  hidden: {\n    display: 'none'\n  },\n\n  visible: {\n    display: 'block'\n  },\n\n  label: {\n    fontSize: '9px',\n    lineHeight: '9px',\n    fontWeight: 'bold',\n    letterSpacing: '0px',\n    marginTop: '-3px',\n    color: theme.palette.text.secondary\n  }\n})\n\n/**\n * A menu icon that animates transitions between open and closed states.\n */\n@inject('app')\n@observer\n@withStyles(styles, { name: 'RSFMenuIcon' })\nexport default class MenuIcon extends PureComponent {\n  static propTypes = {\n    /**\n     * Set to true when the menu is open, otherwise false\n     */\n    open: PropTypes.bool,\n\n    /**\n     * Set to `false` to hide the text \"menu\" underneath the button when the menu is closed.\n     */\n    label: PropTypes.bool\n  }\n\n  static defaultProps = {\n    open: false,\n    label: true\n  }\n\n  renderIcon = (open, label) => {\n    const { classes } = this.props\n    return (\n      <div\n        className={classnames({\n          [classes.root]: true,\n          [classes.active]: open,\n          [classes.withLabel]: label\n        })}\n      >\n        <div className=\"rsf-hamburger\">\n          <span className=\"rsf-hamburger-box\">\n            <span className=\"rsf-hamburger-inner\" />\n          </span>\n        </div>\n        {label && <div className={classes.label}>menu</div>}\n      </div>\n    )\n  }\n\n  render() {\n    const {\n      open,\n      classes,\n      label,\n      app: { amp }\n    } = this.props\n\n    if (amp) {\n      return (\n        <Fragment>\n          <div amp-bind={`class=>menuOpen == false ? '${classes.visible}' : '${classes.hidden}'`}>\n            {this.renderIcon(false)}\n          </div>\n          <div\n            className={classes.hidden}\n            amp-bind={`class=>menuOpen == true ? '${classes.visible}' : '${classes.hidden}'`}\n          >\n            {this.renderIcon(true)}\n          </div>\n        </Fragment>\n      )\n    }\n\n    return this.renderIcon(open, label)\n  }\n}\n",
    description: 'A menu icon that animates transitions between open and closed states.',
    displayName: 'MenuIcon',
    methods: [
      {
        name: 'renderIcon',
        docblock: null,
        modifiers: [],
        params: [{ name: 'open', type: null }, { name: 'label', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'open',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true when the menu is open, otherwise false',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'label',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to `false` to hide the text "menu" underneath the button when the menu is closed.',
          defaultValue: { value: 'true', computed: false }
        }
      }
    ],
    styles: {
      classes: ['root', 'active', 'withLabel', 'hidden', 'visible', 'label'],
      name: 'RSFMenuIcon'
    }
  },
  NavTab: {
    id: 'NavTab',
    filename: 'NavTab',
    importPath: 'NavTab',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport Track from './Track'\nimport Link from './Link'\nimport Tab from '@material-ui/core/Tab'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport { observer } from 'mobx-react'\nimport { lazyState } from './utils/state'\n\nexport const styles = theme => ({\n  root: {\n    height: '56px',\n    [theme.breakpoints.up('md')]: {\n      minWidth: '130px'\n    }\n  },\n  clickEl: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    zIndex: 1\n  },\n  label: {\n    whiteSpace: 'nowrap'\n  },\n  link: {\n    display: 'block',\n    height: '100%',\n    fontSize: theme.typography.body1.fontSize\n  },\n  menu: {\n    padding: `${theme.margins.container}px`\n  },\n  menuItem: {\n    padding: `1em ${theme.margins.container}px`\n  }\n})\n\n@withStyles(styles, { name: 'RSFNavTab' })\n@observer\nexport default class NavTab extends Component {\n  render() {\n    const { classes, state, url, prefetch, text, item } = this.props\n\n    return (\n      <Track event=\"topNavClicked\" item={item}>\n        <Link\n          state={lazyState(state)}\n          className={classes.link}\n          to={url}\n          prefetch={prefetch}\n          onClick={this.props.onClick}\n          anchorProps={{\n            onMouseEnter: this.onMouseEnter,\n            onMouseLeave: this.props.onMouseLeave,\n            'data-th': 'topNavClicked'\n          }}\n        >\n          <Tab\n            className={classes.root}\n            label={text}\n            classes={{\n              label: classes.label\n            }}\n          />\n        </Link>\n      </Track>\n    )\n  }\n\n  onMouseEnter = e => {\n    this.props.onMouseEnter({\n      target: e.currentTarget,\n      menu: this.getMenu()\n    })\n  }\n\n  getMenu() {\n    const { children, item, classes, onItemClick } = this.props\n\n    if (children) {\n      return children\n    } else if (item.items && item.items.length) {\n      return (\n        <div className={classes.menu}>\n          {item.items.map((item, i) => (\n            <div key={i} className={classes.menuItem}>\n              <Link to={item.url} onClick={onItemClick}>\n                {item.text}\n              </Link>\n            </div>\n          ))}\n        </div>\n      )\n    } else {\n      return null\n    }\n  }\n}\n",
    description: '',
    displayName: 'NavTab',
    methods: [
      {
        name: 'onMouseEnter',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      },
      { name: 'getMenu', docblock: null, modifiers: [], params: [], returns: null }
    ],
    styles: {
      classes: ['root', 'clickEl', 'label', 'link', 'menu', 'menuItem'],
      name: 'RSFNavTab'
    },
    props: []
  },
  NavTabs: {
    id: 'NavTabs',
    filename: 'NavTabs',
    importPath: 'NavTabs',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { inject, observer } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport { types, getParent } from 'mobx-state-tree'\nimport { MenuItemModel } from './Menu'\nimport TabsRow from './TabsRow'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport NavTab from './NavTab'\nimport { relativeURL } from './utils/url'\nimport { Fade, Paper, Popper, Hidden } from '@material-ui/core'\nimport { parseState } from './utils/state'\n\n/**\n * Scrollable navigation tabs for the top of the app. All extra props are spread to the\n * underlying Material UI Tabs element.  When a tab is clicked, the \"top_nav_clicked\" analytics\n * event is fired.\n */\nexport const styles = theme => ({\n  tabs: {\n    maxWidth: theme.maxWidth,\n    flex: 1\n  },\n  root: {\n    zIndex: theme.zIndex.appBar - 1,\n    display: 'flex',\n    justifyContent: 'center',\n    position: 'relative',\n    borderRadius: 0,\n    '&::before': {\n      content: \"''\",\n      top: 0,\n      left: 0,\n      width: '15px',\n      height: 'calc(100% - 3px)',\n      position: 'absolute',\n      background:\n        'linear-gradient(to right, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)',\n      zIndex: 1\n    },\n    '&::after': {\n      content: \"''\",\n      top: 0,\n      right: 0,\n      width: '15px',\n      height: 'calc(100% - 3px)',\n      position: 'absolute',\n      background:\n        'linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)',\n      zIndex: 1\n    }\n  },\n  menu: {\n    zIndex: theme.zIndex.appBar\n  },\n  menuPaper: {\n    borderRadius: '0',\n    position: 'relative',\n    top: '1px'\n  },\n  tab: {} // prevents MUI warning about overriding classes.tab prop\n})\n\n@withStyles(styles, { name: 'RSFNavTabs' })\n@inject(({ app, history }) => ({ tabs: app.tabs, history }))\n@observer\nexport default class NavTabs extends Component {\n  static propTypes = {\n    classes: PropTypes.objectOf(PropTypes.string),\n\n    /**\n     * Controls the amount of drop shadow.\n     */\n    elevation: PropTypes.number\n  }\n\n  static defaultProps = {\n    elevation: 2\n  }\n\n  state = {\n    open: false,\n    menu: null,\n    anchorEl: null,\n    overTab: false,\n    overMenu: false\n  }\n\n  render() {\n    const { tabs, classes, staticContext, history, elevation, ...tabsProps } = this.props\n    const { menu, overTab, overMenu, anchorEl } = this.state\n    const open = overTab || overMenu\n\n    if (!tabs) return null\n\n    const { selected } = tabs\n\n    return (\n      <Fragment>\n        <Paper className={classes.root} elevation={elevation}>\n          <TabsRow\n            initialSelectedIdx={selected}\n            onTabChange={this.handleChange}\n            items={tabs.items}\n            tabRenderer={this.renderTab}\n            centered\n            classes={{\n              root: classes.tabs,\n              tab: classes.tab\n            }}\n            {...tabsProps}\n          />\n        </Paper>\n        {!menu ? null : (\n          <Hidden xsDown>\n            <Popper className={classes.menu} open={open} anchorEl={anchorEl} transition>\n              {({ TransitionProps }) => (\n                <Fade {...TransitionProps} timeout={350}>\n                  <Paper\n                    onMouseEnter={this.onMenuEnter}\n                    onMouseLeave={this.onMenuLeave}\n                    className={classes.menuPaper}\n                  >\n                    {menu}\n                  </Paper>\n                </Fade>\n              )}\n            </Popper>\n          </Hidden>\n        )}\n      </Fragment>\n    )\n  }\n\n  renderTab = (item, i) => {\n    return (\n      <NavTab\n        {...item}\n        key={i}\n        item={item}\n        onMouseEnter={this.showMenu}\n        onMouseLeave={this.onTabLeave}\n        onItemClick={this.onItemClick}\n        onClick={this.onItemClick}\n      />\n    )\n  }\n\n  showMenu = ({ menu, target }) => {\n    this.setState({\n      overTab: true,\n      anchorEl: target,\n      menu\n    })\n  }\n\n  onMenuEnter = () => {\n    this.setState({ overMenu: true })\n  }\n\n  onMenuLeave = () => {\n    this.setState({ overMenu: false })\n  }\n\n  onTabLeave = () => {\n    this.setState({ overTab: false })\n  }\n\n  onItemClick = () => {\n    this.setState({ overTab: false, overMenu: false })\n  }\n\n  handleChange = (_event, newValue) => {\n    const { tabs, history } = this.props\n    const item = tabs.items[newValue]\n    const url = relativeURL(item.url)\n\n    if (history) {\n      history.push(url, parseState(item.state))\n    } else {\n      window.location.href = url\n    }\n  }\n}\n\nexport const TabsModel = types\n  .model('TabsModel', {\n    items: types.array(MenuItemModel)\n  })\n  .views(self => ({\n    get selected() {\n      const { location } = getParent(self)\n      const url = location.pathname + location.search\n      const index = self.items.findIndex(item => item.url === url)\n      return index === -1 ? null : index\n    }\n  }))\n",
    description: '',
    displayName: 'NavTabs',
    methods: [
      {
        name: 'renderTab',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }, { name: 'i', type: null }],
        returns: null
      },
      {
        name: 'showMenu',
        docblock: null,
        modifiers: [],
        params: [{ name: '{ menu, target }', type: null }],
        returns: null
      },
      { name: 'onMenuEnter', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'onMenuLeave', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'onTabLeave', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'onItemClick', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'handleChange',
        docblock: null,
        modifiers: [],
        params: [{ name: '_event', type: null }, { name: 'newValue', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'classes',
        props: {
          type: { name: 'objectOf', value: { name: 'string' } },
          required: false,
          description: ''
        }
      },
      {
        name: 'elevation',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'Controls the amount of drop shadow.',
          defaultValue: { value: '2', computed: false }
        }
      }
    ],
    styles: { classes: ['tabs', 'root', 'menu', 'menuPaper', 'tab'], name: 'RSFNavTabs' }
  },
  NoScript: {
    id: 'NoScript',
    filename: 'NoScript',
    importPath: 'NoScript',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React from 'react'\n\n/**\n * A simple wrapper for HTML noscript that is testable in enzyme.  This is\n * needed since enzyme won't render the contents of a noscript element.\n * @param {*} props\n */\nexport default function NoScript(props) {\n  if (process.env.NODE_ENV === 'test') {\n    return <div {...props} />\n  } else {\n    return <noscript {...props} />\n  }\n}\n",
    description:
      "A simple wrapper for HTML noscript that is testable in enzyme.  This is\nneeded since enzyme won't render the contents of a noscript element.\n@param {*} props",
    displayName: 'NoScript',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  Offline: {
    id: 'Offline',
    filename: 'Offline',
    importPath: 'Offline',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { withStyles } from '@material-ui/core'\nimport Typography from '@material-ui/core/Typography'\nimport CloseOffIcon from '@material-ui/icons/CloudOff'\nimport PropTypes from 'prop-types'\n\n@withStyles(theme => ({\n  root: {\n    display: 'flex',\n    flexDirection: 'column',\n    width: '100%',\n    alignItems: 'center',\n    marginTop: '40px',\n    color: '#999'\n  },\n  icon: {\n    fontSize: 60,\n    color: '#999'\n  },\n  heading: {},\n  message: {}\n}))\nexport default class Offline extends Component {\n  static propTypes = {\n    /**\n     * Text or an element to display as the heading.\n     */\n    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n    /**\n     * Text or an element to deplay as the message.\n     */\n    message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n    /**\n     * An icon to display.\n     */\n    Icon: PropTypes.func\n  }\n\n  static defaultProps = {\n    heading: \"You're offline\",\n    message: 'Please check your internet connection',\n    Icon: CloseOffIcon\n  }\n\n  render() {\n    const { classes, heading, message, Icon } = this.props\n\n    return (\n      <div className={classes.root}>\n        <Icon className={classes.icon} />\n        <Typography variant=\"h6\" component=\"h1\" className={classes.heading}>\n          {heading}\n        </Typography>\n        <Typography variant=\"caption\" className={classes.message}>\n          {message}\n        </Typography>\n      </div>\n    )\n  }\n}\n",
    description: '',
    displayName: 'Offline',
    methods: [],
    props: [
      {
        name: 'heading',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'Text or an element to display as the heading.',
          defaultValue: { value: '"You\'re offline"', computed: false }
        }
      },
      {
        name: 'message',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'Text or an element to deplay as the message.',
          defaultValue: { value: "'Please check your internet connection'", computed: false }
        }
      },
      {
        name: 'Icon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'An icon to display.',
          defaultValue: { value: 'CloseOffIcon', computed: true }
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  PWA: {
    id: 'PWA',
    filename: 'PWA',
    importPath: 'PWA',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { inject, observer, Provider } from 'mobx-react'\nimport { Helmet } from 'react-helmet'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport CssBaseline from '@material-ui/core/CssBaseline'\nimport { canUseClientSideNavigation } from './utils/url'\nimport delegate from 'delegate'\nimport { cache } from './router/serviceWorker'\nimport { isSafari } from './utils/browser'\nimport { connectReduxDevtools } from 'mst-middlewares'\nimport { onSnapshot } from 'mobx-state-tree'\nimport debounce from 'lodash/debounce'\n\n/**\n * @private\n * Internal PWA root used when launching the app.  Do not use this class directly\n */\nexport const styles = theme => ({\n  '@global': {\n    'body.moov-modal': {\n      overflow: 'hidden',\n      position: 'fixed',\n      maxWidth: '100vw',\n      maxHeight: '100vh'\n    },\n    'body.moov-blur #root': {\n      filter: 'blur(5px)',\n      transition: `filter ${theme.transitions.duration.enteringScreen}ms`\n    }\n  }\n})\n\n@withStyles(styles)\n@inject(({ app, history, router }) => ({ menu: app.menu, app, history, router, amp: app.amp }))\n@observer\nexport default class PWA extends Component {\n  _nextId = 0\n\n  render() {\n    const { amp, app } = this.props\n\n    return (\n      <Provider nextId={this.nextId}>\n        <Fragment>\n          <CssBaseline />\n          <Helmet>\n            <html lang=\"en\" />\n            <meta charset=\"utf-8\" />\n            <meta\n              name=\"viewport\"\n              content=\"width=device-width,initial-scale=1,minimum-scale=1,shrink-to-fit=no\"\n            />\n            <meta name=\"theme-color\" content=\"#000000\" />\n            {app.description ? <meta name=\"description\" content={app.description} /> : null}\n            {app.canonicalURL ? <link rel=\"canonical\" href={app.canonicalURL} /> : null}\n            <link rel=\"manifest\" href=\"/manifest.json\" />\n            <title>{app.title}</title>\n          </Helmet>\n          {amp && (\n            <Helmet>\n              <script async src=\"https://cdn.ampproject.org/v0.js\" />\n              <script\n                async\n                custom-element=\"amp-install-serviceworker\"\n                src=\"https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js\"\n              />\n            </Helmet>\n          )}\n          {amp && (\n            <amp-install-serviceworker\n              src={`${app.location.urlBase}/service-worker.js`}\n              data-iframe-src={`${app.location.urlBase}/pwa/install-service-worker.html`}\n              layout=\"nodisplay\"\n            />\n          )}\n          {this.props.children}\n        </Fragment>\n      </Provider>\n    )\n  }\n\n  nextId = () => {\n    return this._nextId++\n  }\n\n  componentDidCatch(error, info) {\n    const { app } = this.props\n\n    app.applyState({\n      page: 'Error',\n      error: error.message,\n      stack: info.componentStack\n    })\n  }\n\n  componentDidMount() {\n    const { router, app, history } = this.props\n\n    if (router) {\n      router.on('fetch', this.resetPage)\n      router.watch(history, app.applyState)\n    }\n\n    this.bindAppStateToHistory()\n\n    // scroll to the top and close the when the router runs a PWA route\n    this.watchLinkClicks()\n\n    // put os class on body for platform-specific styling\n    this.addDeviceClassesToBody()\n\n    // set initial offline status\n    app.setOffline(!navigator.onLine)\n\n    window.addEventListener('online', () => {\n      app.setOffline(false)\n      // Fetch fresh page data since offline version may not be correct\n      if (router) {\n        router.fetchFreshState(document.location).then(app.applyState)\n      }\n    })\n\n    window.addEventListener('offline', () => {\n      app.setOffline(true)\n    })\n\n    // Fetching new app state for offline page\n    if (!navigator.onLine && app.page === null) {\n      router.fetchFreshState(document.location).then(state => {\n        state.offline = true\n        app.applyState(state)\n      })\n    }\n\n    // only cache app shell and page if online\n    if (navigator.onLine) {\n      // cache the app shell so that we can load pages when offline when we don't have a cached SSR response\n      if (router && router.isAppShellConfigured()) {\n        cache('/.app-shell')\n      }\n\n      // cache the initial page HTML and json\n      const path = app.location.pathname + app.location.search\n      cache(path + '.json', app.toJSON())\n      cache(path, `<!DOCTYPE html>\\n${document.documentElement.outerHTML}`)\n    }\n\n    this.handleRejections()\n\n    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {\n      connectReduxDevtools(require('remotedev'), app)\n    }\n  }\n\n  /**\n   * Each time the app state changes, record the current app state as the history.state.\n   * This makes restoring the page when going back really fast.\n   */\n  bindAppStateToHistory() {\n    const { app, history } = this.props\n\n    const recordState = snapshot => {\n      const { pathname, search } = history.location\n\n      try {\n        history.replace(pathname + search, snapshot)\n      } catch (e) {\n        // If recording the app state fails, clear out the history state\n        // we don't want the app restoring a stale state if the user navigates back/forward.\n        // Browsers impose a limit on the size of the state object.  Firefox's is the smallest\n        // at 640kB, IE11 is 1MB, and Chrome is at least 10MB. Exceeding this limit is the most\n        // likely reason for history.replace to fail.\n        history.replace(pathname + search, null)\n        console.warn(\n          'Could not record app state in history.  Will fall back to fetching state from the server when navigating back and forward.'\n        )\n      }\n    }\n\n    // record app state in history.state restore it when going back or forward\n    // see Router#onLocationChange\n    onSnapshot(app, debounce(snapshot => !snapshot.loading && recordState(snapshot), 150))\n\n    // record the initial state so that if the user comes back to the initial landing page the app state will be restored correctly.\n    recordState(app.toJSON())\n  }\n\n  /**\n   * When an unhandled rejection occurs, store the error in app state so it\n   * can be displayed to the developer.\n   */\n  handleRejections() {\n    window.addEventListener('unhandledrejection', event => this.props.app.onError(event.reason))\n  }\n\n  /**\n   * Adds a css class corresponding to the browser to the body element\n   * @private\n   */\n  addDeviceClassesToBody() {\n    if (isSafari()) {\n      document.body.classList.add('moov-safari')\n    }\n  }\n\n  /**\n   * Returns true if client-side navigation should be forced, otherwise false\n   * @param {HTMLElement} linkEl\n   * @return {Boolean}\n   */\n  shouldNavigateOnClient(linkEl) {\n    const href = linkEl.getAttribute('href')\n    const linkTarget = linkEl.getAttribute('target')\n\n    // false if the element is not a link\n    if (linkEl.tagName.toLowerCase() !== 'a') return false\n\n    // false if the link was rendered by react-storefront/Link - it will handle nav on its own\n    if (linkEl.getAttribute('data-moov-link') === 'on') return false\n\n    // false if link has data-reload=\"on|true\"\n    if (['true', 'on'].indexOf(linkEl.getAttribute('data-reload')) !== -1) return false\n\n    // false for links with a target other than self\n    if (linkTarget && linkTarget !== '_self') return false\n\n    return canUseClientSideNavigation(href, this.props.router)\n  }\n\n  /**\n   * Watches for clicks on all links and forces client-side navigation if the domain is the same.\n   * This behavior can be overridden by adding data-reload=\"on\" to any link\n   */\n  watchLinkClicks() {\n    // capture click events\n    delegate('a', 'click', e => {\n      const { delegateTarget } = e\n\n      if (this.shouldNavigateOnClient(delegateTarget)) {\n        // don't reload the page\n        e.preventDefault()\n\n        // instead do the navigation client-side using the history API\n        this.props.history.push(delegateTarget.getAttribute('href'))\n      }\n    })\n  }\n\n  resetPage = () => {\n    window.scrollTo(0, 0)\n    this.props.menu.close()\n  }\n}\n",
    description: '',
    displayName: 'PWA',
    methods: [
      { name: 'nextId', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'componentDidCatch',
        docblock: null,
        modifiers: [],
        params: [{ name: 'error', type: null }, { name: 'info', type: null }],
        returns: null
      },
      {
        name: 'bindAppStateToHistory',
        docblock:
          'Each time the app state changes, record the current app state as the history.state.\nThis makes restoring the page when going back really fast.',
        modifiers: [],
        params: [],
        returns: null,
        description:
          'Each time the app state changes, record the current app state as the history.state.\nThis makes restoring the page when going back really fast.'
      },
      {
        name: 'handleRejections',
        docblock:
          'When an unhandled rejection occurs, store the error in app state so it\ncan be displayed to the developer.',
        modifiers: [],
        params: [],
        returns: null,
        description:
          'When an unhandled rejection occurs, store the error in app state so it\ncan be displayed to the developer.'
      },
      {
        name: 'addDeviceClassesToBody',
        docblock: 'Adds a css class corresponding to the browser to the body element\n@private',
        modifiers: [],
        params: [],
        returns: null,
        description: 'Adds a css class corresponding to the browser to the body element'
      },
      {
        name: 'shouldNavigateOnClient',
        docblock:
          'Returns true if client-side navigation should be forced, otherwise false\n@param {HTMLElement} linkEl\n@return {Boolean}',
        modifiers: [],
        params: [{ name: 'linkEl', description: null, type: { name: 'HTMLElement' } }],
        returns: { description: null, type: { name: 'Boolean' } },
        description: 'Returns true if client-side navigation should be forced, otherwise false'
      },
      {
        name: 'watchLinkClicks',
        docblock:
          'Watches for clicks on all links and forces client-side navigation if the domain is the same.\nThis behavior can be overridden by adding data-reload="on" to any link',
        modifiers: [],
        params: [],
        returns: null,
        description:
          'Watches for clicks on all links and forces client-side navigation if the domain is the same.\nThis behavior can be overridden by adding data-reload="on" to any link'
      },
      { name: 'resetPage', docblock: null, modifiers: [], params: [], returns: null }
    ],
    styles: { classes: ['@global'] },
    props: []
  },
  PageLink: {
    id: 'PageLink',
    filename: 'PageLink',
    importPath: 'PageLink',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport Link from './Link'\nimport PropTypes from 'prop-types'\nimport { isAlive } from 'mobx-state-tree'\n\n/**\n * A link to a page that automatically set AppModelBase.loading{props.Page}\n * This component wraps react-storefront/Link and supports all of its props.\n */\nexport default class PageLink extends Component {\n  static propTypes = {\n    /**\n     * An instance of a mobx-state-tree Model to link to\n     */\n    model: PropTypes.object.isRequired,\n\n    /**\n     * The page to display when clicked.\n     */\n    page: PropTypes.string.isRequired\n  }\n\n  render() {\n    let { model, page, ...others } = this.props\n    return <Link to={model.url} state={this.createState} {...others} />\n  }\n\n  createState = () => {\n    let { page, model } = this.props\n\n    if (isAlive(model)) {\n      if (typeof model.createLinkState === 'function') {\n        model = model.createLinkState()\n      } else if (typeof model.toJSON === 'function') {\n        model = model.toJSON()\n      }\n\n      return {\n        page,\n        // setting loading to true here speeds up page transitions because it eliminates the reconciliation cycle that\n        // would otherwise follow when the router decides it needs to fetch data from the srver\n        loading: true,\n        [`loading${page}`]: {\n          id: model.id + '-loading',\n          ...model\n        }\n      }\n    }\n  }\n}\n",
    description:
      'A link to a page that automatically set AppModelBase.loading{props.Page}\nThis component wraps react-storefront/Link and supports all of its props.',
    displayName: 'PageLink',
    methods: [{ name: 'createState', docblock: null, modifiers: [], params: [], returns: null }],
    props: [
      {
        name: 'model',
        props: {
          type: { name: 'object' },
          required: true,
          description: 'An instance of a mobx-state-tree Model to link to'
        }
      },
      {
        name: 'page',
        props: {
          type: { name: 'string' },
          required: true,
          description: 'The page to display when clicked.'
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  Pages: {
    id: 'Pages',
    filename: 'Pages',
    importPath: 'Pages',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { inject, observer } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport LoadMask from './LoadMask'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport universal from 'react-universal-component'\nimport Container from './Container'\nimport Row from './Row'\nimport red from '@material-ui/core/colors/red'\n\nexport const styles = theme => ({\n  root: {\n    position: 'relative',\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'stretch',\n    boxSizing: 'border-box'\n  },\n  error: {\n    background: red[800],\n    color: 'white',\n    position: 'fixed',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    zIndex: 999999,\n    overflow: 'auto'\n  }\n})\n\n/**\n * Switches the app's main view based on the value of the `page` in `AppModelBase`.  Props are spread to\n * component that is displayed.\n */\n@withStyles(styles, { name: 'RSFPages' })\n@inject(({ app }) => ({\n  app,\n  page: app.page,\n  loading: app.loading\n}))\n@observer\nexport default class Pages extends Component {\n  static propTypes = {\n    /**\n     * An object which serves as a map of page name to component to display.  When the value of `page`\n     * in `AppModelBase` matches a key in this object, the corresponding component will be displayed.\n     */\n    components: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,\n\n    /**\n     * An object which serves as a map of page name to mask to display when the page is loading.  When the value of `page`\n     * in `AppModelBase` matches a key in this object, the corresponding mask will be displayed.\n     */\n    loadMasks: PropTypes.object\n  }\n\n  static defaultProps = {\n    loadMasks: {},\n    components: {}\n  }\n\n  state = {\n    loadingComponent: false\n  }\n\n  mounted = false\n  cache = {}\n\n  componentWillMount() {\n    const { components, app } = this.props\n\n    if (typeof components === 'function') {\n      this.components = this.props.components(this.createUniversalComponent)\n    } else {\n      this.components = components\n    }\n\n    this.createAndCachePage(app.page)\n  }\n\n  componentDidMount() {\n    this.mounted = true\n  }\n\n  componentWillUpdate(nextProps) {\n    const { page } = nextProps.app\n\n    if (page !== this.page) {\n      this.createAndCachePage(page)\n      this.page = page\n    }\n  }\n\n  /**\n   * Creates a lazy component that automatically manages the loading spinner\n   * @param {React.Component} comp The component to make lazy\n   * @return {React.Component}\n   */\n  createUniversalComponent = comp => {\n    return universal(comp, {\n      loading: this.componentLoadMask,\n      onLoad: this.onLoad,\n      onError: this.onError,\n      error: this.errorView\n    })\n  }\n\n  createAndCachePage(page) {\n    if (this.cache[page]) return\n\n    const Comp = this.components[page]\n\n    if (Comp) {\n      this.cache[page] = {\n        element: (\n          <Comp\n            key={page}\n            onBefore={this.onStartLoadingComponent}\n            onAfter={this.onEndLoadingComponent}\n          />\n        )\n      }\n    }\n  }\n\n  render() {\n    const { classes, app } = this.props\n    const loading = this.isLoading()\n    let elements = []\n\n    for (let page in this.cache) {\n      const entry = this.cache[page]\n\n      elements.push(\n        <div\n          key={page}\n          data-page={page}\n          style={{ display: page === app.page && !loading ? 'block' : 'none' }}\n        >\n          {entry.element}\n        </div>\n      )\n    }\n\n    return (\n      <div className={classes.root}>\n        {this.renderLoadMask()}\n        {elements}\n      </div>\n    )\n  }\n\n  onStartLoadingComponent = () => {\n    if (this.mounted) this.setState({ loadingComponent: true })\n  }\n\n  onEndLoadingComponent = () => {\n    if (this.mounted) this.setState({ loadingComponent: false })\n  }\n\n  componentLoadMask = () => {\n    return null\n  }\n\n  isLoading = () => {\n    return this.props.app.loading || this.state.loadingComponent\n  }\n\n  renderLoadMask = () => {\n    const { loadMasks, page } = this.props\n    const Mask = loadMasks[page]\n    const loading = this.isLoading()\n\n    if (Mask) {\n      return loading ? <Mask /> : null\n    } else {\n      return <LoadMask show={loading} fullscreen />\n    }\n  }\n\n  errorView = ({ error }) => {\n    const { classes } = this.props\n\n    if (process.env.NODE_ENV === 'production') {\n      let message\n\n      if (error.message.match(/chunk/i)) {\n        message = 'An new version of the app is available.  Reloading...'\n      } else {\n        message = 'An error occurred while attempting to load the page. Please try again later'\n      }\n\n      return (\n        <Container>\n          <Row>{message}</Row>\n        </Container>\n      )\n    } else {\n      return (\n        <Container className={classes.error}>\n          <pre>{error.stack}</pre>\n        </Container>\n      )\n    }\n  }\n\n  onError = e => {\n    if (e.message.match(/chunk/i)) {\n      window.location.reload()\n    }\n  }\n}\n",
    description:
      "Switches the app's main view based on the value of the `page` in `AppModelBase`.  Props are spread to\ncomponent that is displayed.",
    displayName: 'Pages',
    methods: [
      {
        name: 'createUniversalComponent',
        docblock:
          'Creates a lazy component that automatically manages the loading spinner\n@param {React.Component} comp The component to make lazy\n@return {React.Component}',
        modifiers: [],
        params: [
          {
            name: 'comp',
            description: 'The component to make lazy',
            type: { name: 'React.Component' }
          }
        ],
        returns: { description: null, type: { name: 'React.Component' } },
        description: 'Creates a lazy component that automatically manages the loading spinner'
      },
      {
        name: 'createAndCachePage',
        docblock: null,
        modifiers: [],
        params: [{ name: 'page', type: null }],
        returns: null
      },
      { name: 'onStartLoadingComponent', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'onEndLoadingComponent', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'componentLoadMask', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'isLoading', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'renderLoadMask', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'errorView',
        docblock: null,
        modifiers: [],
        params: [{ name: '{ error }', type: null }],
        returns: null
      },
      {
        name: 'onError',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'components',
        props: {
          type: { name: 'union', value: [{ name: 'object' }, { name: 'func' }] },
          required: false,
          description:
            'An object which serves as a map of page name to component to display.  When the value of `page`\nin `AppModelBase` matches a key in this object, the corresponding component will be displayed.',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'loadMasks',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            'An object which serves as a map of page name to mask to display when the page is loading.  When the value of `page`\nin `AppModelBase` matches a key in this object, the corresponding mask will be displayed.',
          defaultValue: { value: '{}', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'error'], name: 'RSFPages' }
  },
  ProductLink: {
    id: 'ProductLink',
    filename: 'ProductLink',
    importPath: 'ProductLink',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport PageLink from './PageLink'\n\n/**\n * A link to the PDP which reuses the thumbnail image from the Subcategory page.\n * The product prop accepts an instance of ProductModelBase or any model that implements createLinkState().\n * This component wraps react-storefront/Link and supports all of its props.\n */\nexport default class ProductLink extends Component {\n  static propTypes = {\n    /**\n     * An instance of ProductModelBase or a model that implements createLinkState()\n     */\n    product: PropTypes.object.isRequired\n  }\n\n  render() {\n    const { product, ...others } = this.props\n    return <PageLink page=\"Product\" model={product} {...others} />\n  }\n}\n",
    description:
      'A link to the PDP which reuses the thumbnail image from the Subcategory page.\nThe product prop accepts an instance of ProductModelBase or any model that implements createLinkState().\nThis component wraps react-storefront/Link and supports all of its props.',
    displayName: 'ProductLink',
    methods: [],
    props: [
      {
        name: 'product',
        props: {
          type: { name: 'object' },
          required: true,
          description:
            'An instance of ProductModelBase or a model that implements createLinkState()'
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  PromoBanner: {
    id: 'PromoBanner',
    filename: 'PromoBanner',
    importPath: 'PromoBanner',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { withStyles } from '@material-ui/core/'\nimport PropTypes from 'prop-types'\nimport Link from './Link'\nimport Track from './Track'\nimport Image from './Image'\nimport classnames from 'classnames'\n\nexport const styles = theme => ({\n  root: {\n    display: 'flex',\n    justifyContent: 'center',\n    zIndex: theme.zIndex.appBar - 1,\n    cursor: 'pointer'\n  },\n  img: {\n    width: '100%',\n    height: '100%',\n    zIndex: theme.zIndex.appBar - 1\n  }\n})\n\n/**\n * A promo banner that automatically fires the promo_banner_clicked analytics event.\n * Additional props are spread to the Link component\n */\n@withStyles(styles, { name: 'RSFPromoBanner' })\nexport default class PromoBanner extends Component {\n  static propTypes = {\n    /**\n     * A css class to apply\n     */\n    className: PropTypes.string,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * An name to idenify the banner with analytics\n     */\n    name: PropTypes.string,\n\n    /**\n     * The url to load for the banner image\n     */\n    src: PropTypes.string,\n\n    /**\n     * The location to navigate to when clicked\n     */\n    href: PropTypes.string,\n\n    /**\n     * An alt value for the img tag\n     */\n    alt: PropTypes.string,\n\n    /**\n     * Additional props for the img tag\n     */\n    imgProps: PropTypes.object\n  }\n\n  static defaultProps = {\n    name: 'promo',\n    alt: 'promo',\n    imgProps: {}\n  }\n\n  render() {\n    const { href, classes, onClick, name, src, alt, imgProps, className, ...others } = this.props\n\n    return (\n      <Track event=\"promoBannerClicked\" name={name} imageUrl={src}>\n        <Link\n          {...others}\n          to={href}\n          className={classnames(className, classes.root)}\n          onClick={onClick}\n        >\n          <Image className={classes.img} src={src} alt={alt} contain {...imgProps} />\n        </Link>\n      </Track>\n    )\n  }\n}\n",
    description:
      'A promo banner that automatically fires the promo_banner_clicked analytics event.\nAdditional props are spread to the Link component',
    displayName: 'PromoBanner',
    methods: [],
    props: [
      {
        name: 'className',
        props: { type: { name: 'string' }, required: false, description: 'A css class to apply' }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'name',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'An name to idenify the banner with analytics',
          defaultValue: { value: "'promo'", computed: false }
        }
      },
      {
        name: 'href',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The location to navigate to when clicked'
        }
      },
      {
        name: 'alt',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'An alt value for the img tag',
          defaultValue: { value: "'promo'", computed: false }
        }
      },
      {
        name: 'imgProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Additional props for the img tag',
          defaultValue: { value: '{}', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'img'], name: 'RSFPromoBanner' }
  },
  QuantitySelector: {
    id: 'QuantitySelector',
    filename: 'QuantitySelector',
    importPath: 'QuantitySelector',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Fragment, Component } from 'react'\nimport Add from '@material-ui/icons/Add'\nimport Remove from '@material-ui/icons/Remove'\nimport IconButton from '@material-ui/core/IconButton'\nimport Input from '@material-ui/core/Input'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport PropTypes from 'prop-types'\nimport { observer, inject } from 'mobx-react'\n\nexport const styles = theme => ({\n  root: {\n    backgroundColor: theme.palette.divider,\n    border: 'none',\n    width: '110px',\n    padding: 0\n  },\n  icon: {\n    fontSize: theme.typography.title.fontSize,\n    position: 'relative'\n  },\n  button: {\n    height: '36px',\n    width: '36px',\n    padding: 0\n  },\n  input: {\n    color: theme.typography.body1.color,\n    textAlign: 'center',\n    padding: 0\n  },\n  focused: {\n    backgroundColor: theme.palette.divider\n  },\n  underline: {\n    '&::before': {\n      display: 'none'\n    }\n  }\n})\n\n/**\n * A quantity selector with plus and minus buttons. Any extra props are spread to the\n * underlying Material UI input element.\n */\n@inject(({ app, ampStateId }) => ({ app, ampStateId }))\n@withStyles(styles, { name: 'RSFQuantitySelector' })\n@observer\nexport default class QuantitySelector extends Component {\n  static propTypes = {\n    /**\n     * The name to apply to the input when rendering AMP.\n     */\n    name: PropTypes.string,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * The plus icon\n     */\n    addIcon: PropTypes.element,\n\n    /**\n     * The minus icon\n     */\n    subtractIcon: PropTypes.element,\n\n    /**\n     * The current value\n     */\n    value: PropTypes.number,\n\n    /**\n     * The minimum value.  Defaults to 1.\n     */\n    minValue: PropTypes.number,\n\n    /**\n     * The maximum value.  Defaults to 100.\n     */\n    maxValue: PropTypes.number,\n\n    /**\n     * Called when the value is changed.  The new value is passed as the only argument\n     */\n    onChange: PropTypes.func,\n\n    /**\n     * If specified, this component will automatically control the price of a product.\n     * This should be an instance of ProductModelBase\n     */\n    product: PropTypes.object,\n\n    /**\n     * The accessibility label.  Add and subtract button aria-label values are derived from this as \"add one {ariaLabel}\" and \"subtract one {ariaLabel}\"\n     */\n    ariaLabel: PropTypes.string\n  }\n\n  static defaultProps = {\n    name: 'quantity',\n    onChange: Function.prototype,\n    minValue: 1,\n    maxValue: 100,\n    value: 1,\n    ariaLabel: 'quantity'\n  }\n\n  render() {\n    let {\n      name,\n      app,\n      classes,\n      addIcon,\n      subtractIcon,\n      value,\n      minValue,\n      maxValue,\n      analytics,\n      product,\n      inputProps,\n      ampStateId,\n      ariaLabel,\n      ...other\n    } = this.props\n\n    if (product) {\n      value = product.quantity\n    }\n\n    const { quantitySelector, icon, button, ...inputClasses } = classes\n\n    const bindProps = {\n      inputProps: {\n        'aria-label': ariaLabel,\n        name,\n        ...inputProps,\n        'amp-bind': `value=>${ampStateId}.quantity`\n      },\n      [app.amp ? 'readOnly' : 'disabled']: true\n    }\n\n    return (\n      <Fragment>\n        <Input\n          startAdornment={\n            <IconButton\n              size=\"small\"\n              classes={{ root: button }}\n              onClick={() => this.onChange(value - 1)}\n              aria-label={`add one ${ariaLabel}`}\n              on={`tap:AMP.setState({ ${ampStateId}: { quantity: max(${minValue}, (${ampStateId}.quantity || ${value}) - 1) } })`}\n            >\n              {subtractIcon || <Remove classes={{ root: icon }} />}\n            </IconButton>\n          }\n          endAdornment={\n            <IconButton\n              size=\"small\"\n              classes={{ root: button }}\n              onClick={() => this.onChange(value + 1)}\n              aria-label={`subtract one ${ariaLabel}`}\n              on={`tap:AMP.setState({ ${ampStateId}: { quantity: min(${maxValue}, (${ampStateId}.quantity || ${value}) + 1) } })`}\n            >\n              {addIcon || <Add classes={{ root: icon }} />}\n            </IconButton>\n          }\n          onChange={this.onChange}\n          value={value}\n          classes={{\n            underline: classes.underline,\n            ...inputClasses\n          }}\n          {...bindProps}\n          {...other}\n        />\n      </Fragment>\n    )\n  }\n\n  onChange = value => {\n    const { minValue, maxValue, product } = this.props\n\n    if (value >= minValue && value <= maxValue) {\n      this.props.onChange(value)\n\n      if (product) {\n        product.setQuantity(value)\n      }\n    }\n  }\n}\n",
    description:
      'A quantity selector with plus and minus buttons. Any extra props are spread to the\nunderlying Material UI input element.',
    displayName: 'QuantitySelector',
    methods: [
      {
        name: 'onChange',
        docblock: null,
        modifiers: [],
        params: [{ name: 'value', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'name',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The name to apply to the input when rendering AMP.',
          defaultValue: { value: "'quantity'", computed: false }
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'addIcon',
        props: { type: { name: 'element' }, required: false, description: 'The plus icon' }
      },
      {
        name: 'subtractIcon',
        props: { type: { name: 'element' }, required: false, description: 'The minus icon' }
      },
      {
        name: 'value',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The current value',
          defaultValue: { value: '1', computed: false }
        }
      },
      {
        name: 'minValue',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The minimum value.  Defaults to 1.',
          defaultValue: { value: '1', computed: false }
        }
      },
      {
        name: 'maxValue',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The maximum value.  Defaults to 100.',
          defaultValue: { value: '100', computed: false }
        }
      },
      {
        name: 'onChange',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            'Called when the value is changed.  The new value is passed as the only argument',
          defaultValue: { value: 'Function.prototype', computed: true }
        }
      },
      {
        name: 'product',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            'If specified, this component will automatically control the price of a product.\nThis should be an instance of ProductModelBase'
        }
      },
      {
        name: 'ariaLabel',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The accessibility label.  Add and subtract button aria-label values are derived from this as "add one {ariaLabel}" and "subtract one {ariaLabel}"',
          defaultValue: { value: "'quantity'", computed: false }
        }
      }
    ],
    styles: {
      classes: ['root', 'icon', 'button', 'input', 'focused', 'underline'],
      name: 'RSFQuantitySelector'
    }
  },
  Rating: {
    id: 'Rating',
    filename: 'Rating',
    importPath: 'Rating',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport Star from '@material-ui/icons/Star'\nimport StarBorder from '@material-ui/icons/StarBorder'\nimport StarHalf from '@material-ui/icons/StarHalf'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\nimport { Hbox } from './Box'\n\n/**\n * Displays a star rating corresponding to the provided value\n */\nexport const styles = theme => ({\n  root: {\n    display: 'flex',\n    '& svg': {\n      color: theme.palette.rating,\n      height: '16px',\n      width: '16px',\n      display: 'block'\n    }\n  },\n  filledEmpty: {\n    fill: theme.palette.divider\n  },\n  blank: {\n    '& svg': {\n      color: theme.palette.divider\n    }\n  },\n  reviewsLabel: {\n    marginLeft: '3px'\n  }\n})\n\n@withStyles(styles, { name: 'RSFRating' })\nexport default class Rating extends Component {\n  static propTypes = {\n    /**\n     * CSS classes to apply\n     */\n    classes: PropTypes.object,\n\n    /**\n     * The number of stars to display.  Can be an integer or a float\n     * ending in .5.\n     */\n    value: PropTypes.number,\n\n    /**\n     * The number of reviews\n     */\n    reviewCount: PropTypes.number,\n\n    /**\n     * A function that returns the label displayed to the right of the review count.\n     * For example: `<Rating label={reviewCount => <span> {reviewCount == 1 ? 'review' : 'reviews'}</span>}/>`.\n     * This value used in this example is the default.\n     */\n    label: PropTypes.func,\n\n    /**\n     * An instance of ProductModelBase.  You can set this instead of setting value an reviewCount individually.\n     */\n    product: PropTypes.object,\n\n    /**\n     * Custom full point icon\n     */\n    iconFull: PropTypes.func,\n\n    /**\n     * Custom half point icon\n     */\n    iconHalf: PropTypes.func,\n\n    /**\n     * Custom empty icon, will override fillEmpty icon\n     */\n    iconEmpty: PropTypes.func,\n\n    /**\n     * Use filled icon with light grey background for empty icon\n     */\n    fillEmpty: PropTypes.bool\n  }\n\n  static defaultProps = {\n    label: reviewCount => <span> {reviewCount == 1 ? 'review' : 'reviews'}</span>,\n    fillEmpty: false\n  }\n\n  render() {\n    let {\n      iconFull,\n      iconHalf,\n      iconEmpty,\n      classes,\n      value,\n      label,\n      reviewCount,\n      className,\n      product,\n      fillEmpty\n    } = this.props\n    let stars = []\n\n    if (product) {\n      reviewCount = product.reviewCount\n      value = product.rating\n    }\n\n    const IconFull = iconFull || Star\n    const IconHalf = iconHalf || StarHalf\n    const IconEmpty = iconEmpty || StarBorder\n\n    for (let i = 1; i <= 5; i++) {\n      if (value == null || value >= i) {\n        stars.push(<IconFull key={i} />)\n      } else if (value >= i - 0.5) {\n        stars.push(<IconHalf key={i} />)\n      } else if (fillEmpty) {\n        stars.push(<IconFull className={classes.filledEmpty} key={i} />)\n      } else {\n        stars.push(<IconEmpty key={i} />)\n      }\n    }\n\n    return (\n      <Hbox>\n        <div className={classnames(classes.root, className, { [classes.blank]: value == null })}>\n          {stars}\n        </div>\n        {reviewCount ? (\n          <div className={classes.reviewsLabel}>\n            ({reviewCount}\n            {label(reviewCount)})\n          </div>\n        ) : null}\n      </Hbox>\n    )\n  }\n}\n",
    description: '',
    displayName: 'Rating',
    methods: [],
    props: [
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes to apply' }
      },
      {
        name: 'value',
        props: {
          type: { name: 'number' },
          required: false,
          description:
            'The number of stars to display.  Can be an integer or a float\nending in .5.'
        }
      },
      {
        name: 'reviewCount',
        props: { type: { name: 'number' }, required: false, description: 'The number of reviews' }
      },
      {
        name: 'label',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            "A function that returns the label displayed to the right of the review count.\nFor example: `<Rating label={reviewCount => <span> {reviewCount == 1 ? 'review' : 'reviews'}</span>}/>`.\nThis value used in this example is the default.",
          defaultValue: {
            value: "reviewCount => <span> {reviewCount == 1 ? 'review' : 'reviews'}</span>",
            computed: false
          }
        }
      },
      {
        name: 'product',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            'An instance of ProductModelBase.  You can set this instead of setting value an reviewCount individually.'
        }
      },
      {
        name: 'iconFull',
        props: { type: { name: 'func' }, required: false, description: 'Custom full point icon' }
      },
      {
        name: 'iconHalf',
        props: { type: { name: 'func' }, required: false, description: 'Custom half point icon' }
      },
      {
        name: 'iconEmpty',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'Custom empty icon, will override fillEmpty icon'
        }
      },
      {
        name: 'fillEmpty',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Use filled icon with light grey background for empty icon',
          defaultValue: { value: 'false', computed: false }
        }
      }
    ],
    styles: { classes: ['root', 'filledEmpty', 'blank', 'reviewsLabel'], name: 'RSFRating' }
  },
  Redbox: {
    id: 'Redbox',
    filename: 'Redbox',
    importPath: 'Redbox',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { inject, observer } from 'mobx-react'\nimport RedboxReact from 'redbox-react'\nimport uniq from 'lodash/uniq'\nimport withStyles from '@material-ui/core/styles/withStyles'\n\nexport const styles = theme => ({\n  amp: {\n    fontWeight: 'bold',\n    backgroundColor: 'red',\n    color: 'white',\n    position: 'fixed',\n    top: 0,\n    bottom: 0,\n    left: 0,\n    right: 0,\n    overflow: 'auto',\n    zIndex: theme.zIndex.amp.modal + 10,\n    padding: `${theme.margins.container}px`,\n    whiteSpace: 'pre-wrap',\n    fontWeight: 'bold',\n    margin: 0\n  }\n})\n\n/**\n * A basic error view for use in development.  Since this shows a low-level error message and stack trace,\n * you should replace this with something more user-friendly in production.\n */\n@withStyles(styles, { name: 'RSFRedbox' })\n@inject('app')\n@observer\nexport default class Redbox extends Component {\n  componentDidMount() {\n    // log original error message to the console\n    const { error, stack } = this.props.app\n    console.error(this.reformat(error))\n    console.error(this.createError(error, stack))\n  }\n\n  render() {\n    // render improved error message\n    const {\n      app: { error, stack, amp },\n      classes\n    } = this.props\n\n    if (!error) {\n      return null\n    } else if (amp) {\n      return (\n        <pre className={classes.amp}>\n          {this.reformat(error)}\n          <br />\n          <br />\n          {stack}\n        </pre>\n      )\n    } else {\n      return <RedboxReact error={this.createError(this.reformat(error), stack)} />\n    }\n  }\n\n  /**\n   * Creates an Error with the specified message and stack\n   * @param {String} message\n   * @param {String[]} stack\n   * @return {Error}\n   */\n  createError(message, stack) {\n    const error = new Error(this.reformat(message))\n    error.stack = stack\n    return error\n  }\n\n  /**\n   * Adds additional helpful info to an error message\n   * @param {String} message The original error message\n   * @return {String}\n   */\n  reformat(message) {\n    try {\n      if (message.includes('[mobx-state-tree] Error while converting')) {\n        // mobx-state-tree error\n        const filename = (message.match(/\"filename\":\"(\\w+)\"/) || [])[1]\n        const model = message.match(/is not assignable to type: `\\((\\w+) \\|/)[1]\n        const paths = message\n          .match(/at path \"([^\"]*)\"/g)\n          .map(path => path.match(/at path \"([^\"]*)\"/)[1])\n\n        return `mobx-state-tree - attempted to assign a value of incorrect type to ${uniq(\n          paths\n        ).join(', ')}${model === 'AnonymousModel' ? '' : ` in ${model}`}${\n          filename ? ' (' + filename + ')' : ''\n        }.`\n      } else {\n        return message\n      }\n    } catch (e) {\n      return message\n    }\n  }\n}\n",
    description:
      'A basic error view for use in development.  Since this shows a low-level error message and stack trace,\nyou should replace this with something more user-friendly in production.',
    displayName: 'Redbox',
    methods: [
      {
        name: 'createError',
        docblock:
          'Creates an Error with the specified message and stack\n@param {String} message\n@param {String[]} stack\n@return {Error}',
        modifiers: [],
        params: [
          { name: 'message', description: null, type: { name: 'String' } },
          { name: 'stack', description: null, type: { name: 'Array' } }
        ],
        returns: { description: null, type: { name: 'Error' } },
        description: 'Creates an Error with the specified message and stack'
      },
      {
        name: 'reformat',
        docblock:
          'Adds additional helpful info to an error message\n@param {String} message The original error message\n@return {String}',
        modifiers: [],
        params: [
          { name: 'message', description: 'The original error message', type: { name: 'String' } }
        ],
        returns: { description: null, type: { name: 'String' } },
        description: 'Adds additional helpful info to an error message'
      }
    ],
    styles: { classes: ['amp'], name: 'RSFRedbox' },
    props: []
  },
  ResponsiveTiles: {
    id: 'ResponsiveTiles',
    filename: 'ResponsiveTiles',
    importPath: 'ResponsiveTiles',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport GridListTile from '@material-ui/core/GridListTile'\nimport classnames from 'classnames'\nimport PropTypes from 'prop-types'\nimport withStyles from '@material-ui/core/styles/withStyles'\n\n/**\n * A responsive grid of tiles that changes the number of columns based on the viewport size.\n * This component commonly used in product listings and search results.\n */\nexport default class ResponsiveTiles extends Component {\n  constructor(props) {\n    super(props)\n    this.Tiles = createInner(props)\n  }\n\n  static propTypes = {\n    /**\n     * A map of viewport widths to number of columns.  For example:\n     * ```\n     *  cols={{\n     *    xs: 2,\n     *    sm: 3,\n     *    md: 4,\n     *    lg: 5,\n     *    xl: 5\n     *  }}\n     * ```\n     *\n     * The amounts shown in the example above are the defaults.\n     */\n    cols: PropTypes.object,\n\n    /**\n     * The spacing between the tiles in pixels. Defaults to 15\n     */\n    spacing: PropTypes.number\n  }\n\n  static defaultProps = {\n    cols: {\n      xs: 2,\n      sm: 3,\n      md: 4,\n      lg: 5,\n      xl: 5\n    },\n    spacing: 15\n  }\n\n  render() {\n    const { Tiles } = this\n    const { cols, spacing, ...others } = this.props\n    return <Tiles {...others} />\n  }\n}\n\nfunction createInner({ spacing, cols }) {\n  const styles = theme => {\n    let breakpoints = {}\n\n    // Breakpoints MUST be set in order from smallest to largest\n    Object.keys(cols)\n      .map(width => {\n        return {\n          key: width,\n          value: cols[width],\n          width: `${100 / cols[width]}%`\n        }\n      })\n      .sort((a, b) => a.value - b.value)\n      .forEach(({ key, width }) => {\n        breakpoints[theme.breakpoints.up(key)] = { width }\n      })\n\n    return {\n      root: {\n        display: 'flex',\n        flexWrap: 'wrap',\n        overflowY: 'auto',\n        listStyle: 'none',\n        padding: 0,\n        margin: `-${spacing / 2}px`,\n        WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.\n      },\n      tile: {\n        ...breakpoints,\n        padding: `${spacing / 2}px`,\n        height: 'auto'\n      }\n    }\n  }\n\n  const ResponsiveTilesInner = class extends Component {\n    render() {\n      const { className, classes, children, ...other } = this.props\n\n      return (\n        <ul className={classnames(className, classes.root)} {...other}>\n          {React.Children.map(children, (child, i) => {\n            if (!React.isValidElement(child)) {\n              return null\n            }\n            return (\n              <GridListTile key={i} classes={{ root: classes.tile }}>\n                {child}\n              </GridListTile>\n            )\n          })}\n        </ul>\n      )\n    }\n  }\n\n  return withStyles(styles, { name: 'RSFResponsiveTiles' })(ResponsiveTilesInner)\n}\n",
    description:
      'A responsive grid of tiles that changes the number of columns based on the viewport size.\nThis component commonly used in product listings and search results.',
    displayName: 'ResponsiveTiles',
    methods: [],
    props: [
      {
        name: 'cols',
        props: {
          type: { name: 'object' },
          required: false,
          description:
            'A map of viewport widths to number of columns.  For example:\n```\n cols={{\n   xs: 2,\n   sm: 3,\n   md: 4,\n   lg: 5,\n   xl: 5\n }}\n```\n\nThe amounts shown in the example above are the defaults.',
          defaultValue: {
            value: '{\n  xs: 2,\n  sm: 3,\n  md: 4,\n  lg: 5,\n  xl: 5\n}',
            computed: false
          }
        }
      },
      {
        name: 'spacing',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'The spacing between the tiles in pixels. Defaults to 15',
          defaultValue: { value: '15', computed: false }
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  Row: {
    id: 'Row',
    filename: 'Row',
    importPath: 'Row',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport classnames from 'classnames'\n\nexport const styles = theme => ({\n  root: {\n    margin: `${theme.spacing.row || 15}px 0`\n  }\n})\n\n@withStyles(styles, { name: 'RSFRow' })\nexport default class Row extends Component {\n  render() {\n    const { classes, className, children, ...other } = this.props\n    return (\n      <div className={classnames(classes.root, className)} {...other}>\n        {children}\n      </div>\n    )\n  }\n}\n",
    description: '',
    displayName: 'Row',
    methods: [],
    styles: { classes: ['root'], name: 'RSFRow' },
    props: []
  },
  SearchDrawer: {
    id: 'SearchDrawer',
    filename: 'SearchDrawer',
    importPath: 'SearchDrawer',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Button from '@material-ui/core/Button'\nimport Input from '@material-ui/core/Input'\nimport IconButton from '@material-ui/core/IconButton'\nimport SearchIcon from '@material-ui/icons/Search'\nimport ClearIcon from '@material-ui/icons/Clear'\nimport Typography from '@material-ui/core/Typography'\nimport PropTypes from 'prop-types'\nimport Highlight from 'react-highlighter'\nimport CircularProgress from '@material-ui/core/CircularProgress'\nimport Link from './Link'\nimport { inject, observer } from 'mobx-react'\nimport { onPatch } from 'mobx-state-tree'\nimport Image from './Image'\nimport Container from './Container'\nimport classnames from 'classnames'\nimport Drawer from '@material-ui/core/Drawer'\nimport { Hbox } from './Box'\n\n/**\n * A modal search UI that displays a single text search field and grouped results.  The\n * data for this component is defined in react-storefront/model/SearchModelBase.  In most cases, you can\n * add this component to your PWA simply by adding it to App.js without any props:\n *\n *  <SearchDrawer/>\n *\n * When the user enters text in the search field, SearchModelBase calls /search/suggest, which by default is mapped to\n * src/search/suggest-handler.js in the starter app.\n *\n * See https://github.com/moovweb/react-storefront-boilerplate/tree/master/src/search/suggest-handler.js for\n * the placeholder implementation of the suggestion API.\n *\n * When the user taps the search icon or types the enter key in the search field, the drawer closes and the url\n * is set to /search?q=(the user's search text).\n *\n * See src/routes.js to edit the mappings for /search and /search/suggest.\n */\nexport const styles = theme => ({\n  root: {\n    zIndex: 9999\n  },\n  paper: {\n    backgroundColor: 'rgba(255, 255, 255, .7)'\n  },\n  paperAnchorBottom: {\n    top: '0'\n  },\n  wrap: {\n    height: '100vh',\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'stretch'\n  },\n  header: {\n    backgroundColor: theme.palette.primary.main,\n    padding: theme.margins.container,\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'stretch'\n  },\n  closeButton: {\n    color: theme.palette.primary.contrastText,\n    margin: '-10px -10px 10px 0',\n    alignSelf: 'flex-end',\n    '& span': {\n      textTransform: 'uppercase',\n      fontWeight: 'bold'\n    }\n  },\n  closeButtonText: {\n    border: `1px solid ${theme.palette.primary.contrastText}`,\n    margin: '0 0 10px 0'\n  },\n  searchField: {\n    flexGrow: 1,\n    border: 0,\n    borderRadius: '35px',\n    backgroundColor: theme.palette.background.paper,\n    margin: 0,\n    height: '48px'\n  },\n  searchInput: {\n    padding: '0 0 0 20px'\n  },\n  groupCaption: {\n    textTransform: 'uppercase',\n    margin: '30px 0 10px 0'\n  },\n  group: {\n    listStyle: 'none',\n    margin: 0,\n    padding: 0,\n    '& a strong': {\n      fontWeight: 'bold',\n      color: theme.palette.text.primary\n    }\n  },\n  thumbnailGroup: {\n    display: 'flex',\n    listStyle: 'none',\n    margin: '0 -15px',\n    padding: '0 10px',\n    overflowX: 'auto',\n    '& > li': {\n      margin: '5px'\n    },\n    '& img': {\n      height: '120px'\n    }\n  },\n  thumbnail: {\n    marginBottom: '10px'\n  },\n  results: {\n    flex: 1,\n    overflowY: 'auto',\n    padding: '10px'\n  },\n  loading: {\n    display: 'flex',\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center'\n  },\n  searchFab: {\n    height: '48px',\n    width: '48px',\n    marginLeft: '10px',\n    backgroundColor: theme.palette.background.paper,\n    color: theme.palette.text.secondary\n  }\n})\n\n@withStyles(styles, { name: 'RSFSearchDrawer' })\n@inject(({ app: { search }, history, theme }) => ({ search, history, theme }))\n@observer\nexport default class SearchDrawer extends Component {\n  static propTypes = {\n    /**\n     * The placeholder text for the input.  Defaults to \"Search...\"\n     */\n    placeholder: PropTypes.string,\n    /**\n     * Set this prop to use a text button instead of an icon for the close button.  If set, CloseButtonIcon\n     * will be ignored\n     */\n    closeButtonText: PropTypes.string,\n    /**\n     * Overrides the default close icon.  Takes a React component.\n     */\n    CloseButtonIcon: PropTypes.func,\n    /**\n     * Set to false to disable background blurring.  Defaults to true.\n     */\n    blurBackground: PropTypes.bool,\n    /**\n     * Set to \"icon\" to display the search button as an icon in the search input.\n     * Set to \"fab\" to display the search button as a separate floating action button to the right of the search input when\n     * the user enters text.\n     */\n    searchButtonVariant: PropTypes.oneOf(['icon', 'fab']),\n    /**\n     * Set to false to never show the clear button.  The search icon will be shown inside the input even when the user has entered text.\n     */\n    showClearButton: PropTypes.bool\n  }\n\n  static defaultProps = {\n    placeholder: 'Search...',\n    CloseButtonIcon: () => <ClearIcon />,\n    blurBackground: true,\n    searchButtonVariant: 'fab',\n    showClearButton: true\n  }\n\n  constructor({ search }) {\n    super()\n    this.inputRef = input => (this.input = input)\n    onPatch(search, this.onSearchPatch)\n  }\n\n  onSearchPatch = ({ path, value }) => {\n    const { blurBackground } = this.props\n\n    if (path === '/show') {\n      if (value) {\n        setTimeout(() => this.input.focus(), 250)\n      } else {\n        this.input.blur()\n      }\n      if (blurBackground) {\n        document.body.classList.toggle('moov-blur', value)\n      }\n    }\n  }\n\n  render() {\n    const {\n      classes,\n      search,\n      placeholder,\n      blurBackground,\n      searchButtonVariant,\n      showClearButton\n    } = this.props\n    const loading = search.loading\n    const contentReady = this.props.search.text && !loading\n\n    return (\n      <Drawer\n        open={search.show}\n        anchor=\"bottom\"\n        className={classes.root}\n        classes={{\n          paper: blurBackground ? classes.paper : '',\n          paperAnchorBottom: classes.paperAnchorBottom\n        }}\n        ModalProps={{\n          hideBackdrop: true\n        }}\n      >\n        <div className={classes.wrap}>\n          <form className={classes.header} onSubmit={this.onSearchFormSubmit}>\n            {this.renderCloseButton()}\n            <Hbox>\n              <Input\n                type=\"text\"\n                value={search.text}\n                placeholder={placeholder}\n                onChange={e => this.onChangeSearchText(e.target.value)}\n                onFocus={this.onInputFocus}\n                disableUnderline\n                inputRef={this.inputRef}\n                classes={{\n                  root: classes.searchField,\n                  input: classes.searchInput\n                }}\n                endAdornment={\n                  search.text && showClearButton ? (\n                    <IconButton onClick={this.clearSearch} className={classes.searchReset}>\n                      <ClearIcon rel=\"clear\" />\n                    </IconButton>\n                  ) : (\n                    searchButtonVariant === 'icon' && (\n                      <IconButton onClick={this.onSearchSubmit} className={classes.searchButton}>\n                        <SearchIcon rel=\"search\" />\n                      </IconButton>\n                    )\n                  )\n                }\n              />\n              {searchButtonVariant === 'fab' && search.text.length > 0 && (\n                <Button variant=\"fab\" className={classes.searchFab} onClick={this.onSearchSubmit}>\n                  <SearchIcon rel=\"search\" />\n                </Button>\n              )}\n            </Hbox>\n          </form>\n          {loading && (\n            <div className={classes.loading}>\n              <CircularProgress />\n            </div>\n          )}\n          {contentReady && (\n            <div className={classes.results}>\n              {this.props.search.groups.map(group => (\n                <Container key={group.caption}>\n                  <Typography className={classes.groupCaption}>{group.caption}</Typography>\n                  {this.renderGroup(group)}\n                </Container>\n              ))}\n            </div>\n          )}\n        </div>\n      </Drawer>\n    )\n  }\n\n  renderCloseButton() {\n    const { classes, closeButtonText, CloseButtonIcon } = this.props\n    const ButtonElement = closeButtonText ? Button : IconButton\n\n    return (\n      <ButtonElement\n        className={classnames({\n          [classes.closeButton]: true,\n          [classes.closeButtonText]: closeButtonText != null\n        })}\n        variant=\"contained\"\n        color=\"primary\"\n        onClick={this.hide}\n      >\n        {closeButtonText || <CloseButtonIcon />}\n      </ButtonElement>\n    )\n  }\n\n  renderGroup(group) {\n    const { classes } = this.props\n\n    return (\n      <ul\n        className={classnames({\n          [classes.group]: !group.thumbnails,\n          [classes.thumbnailGroup]: group.thumbnails\n        })}\n      >\n        {group.results.map((result, i) => (\n          <li key={i}>\n            <Link to={result.url} onClick={this.hide}>\n              {group.thumbnails ? this.renderThumbnail(result) : this.renderLinkText(result)}\n            </Link>\n          </li>\n        ))}\n      </ul>\n    )\n  }\n\n  renderLinkText(result) {\n    return (\n      <Typography>\n        <Highlight search={this.props.search.text}>{result.text}</Highlight>\n      </Typography>\n    )\n  }\n\n  renderThumbnail(result) {\n    const { classes } = this.props\n\n    return (\n      <Fragment>\n        <div>\n          <Image\n            className={classes.thumbnail}\n            src={result.thumbnail}\n            height={result.thumbnailHeight}\n            width={result.thumbnailWidth}\n          />\n        </div>\n        <div>\n          <Typography>{result.text}</Typography>\n        </div>\n      </Fragment>\n    )\n  }\n\n  /**\n   * Updates the model when the user enteres search text\n   */\n  onChangeSearchText = text => {\n    this.props.search.setText(text)\n  }\n\n  /**\n   * Clears the search text\n   */\n  clearSearch = () => {\n    this.onChangeSearchText('')\n  }\n\n  /**\n   * Hides the drawer\n   */\n  hide = () => {\n    this.props.search.toggle(false)\n  }\n\n  /**\n   * Submits the search and hides the drawer\n   */\n  onSearchSubmit = () => {\n    this.props.history.push(`/search?q=${encodeURIComponent(this.props.search.text)}`)\n    this.hide()\n  }\n\n  /**\n   * Listener to enable submitting the search by hitting enter\n   */\n  onSearchFormSubmit = e => {\n    e.preventDefault()\n    this.onSearchSubmit()\n  }\n\n  /**\n   * Selects all of the text when the input is focused\n   */\n  onInputFocus = () => {\n    const { input } = this\n    input.setSelectionRange(0, input.value.length)\n  }\n\n  componentWillUnmount() {\n    if (this.props.blurBackground && this.props.search.show) {\n      document.body.classList.remove('moov-blur')\n    }\n  }\n}\n",
    description: '',
    displayName: 'SearchDrawer',
    methods: [
      {
        name: 'onSearchPatch',
        docblock: null,
        modifiers: [],
        params: [{ name: '{ path, value }', type: null }],
        returns: null
      },
      { name: 'renderCloseButton', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'renderGroup',
        docblock: null,
        modifiers: [],
        params: [{ name: 'group', type: null }],
        returns: null
      },
      {
        name: 'renderLinkText',
        docblock: null,
        modifiers: [],
        params: [{ name: 'result', type: null }],
        returns: null
      },
      {
        name: 'renderThumbnail',
        docblock: null,
        modifiers: [],
        params: [{ name: 'result', type: null }],
        returns: null
      },
      {
        name: 'onChangeSearchText',
        docblock: 'Updates the model when the user enteres search text',
        modifiers: [],
        params: [{ name: 'text' }],
        returns: null,
        description: 'Updates the model when the user enteres search text'
      },
      {
        name: 'clearSearch',
        docblock: 'Clears the search text',
        modifiers: [],
        params: [],
        returns: null,
        description: 'Clears the search text'
      },
      {
        name: 'hide',
        docblock: 'Hides the drawer',
        modifiers: [],
        params: [],
        returns: null,
        description: 'Hides the drawer'
      },
      {
        name: 'onSearchSubmit',
        docblock: 'Submits the search and hides the drawer',
        modifiers: [],
        params: [],
        returns: null,
        description: 'Submits the search and hides the drawer'
      },
      {
        name: 'onSearchFormSubmit',
        docblock: 'Listener to enable submitting the search by hitting enter',
        modifiers: [],
        params: [{ name: 'e' }],
        returns: null,
        description: 'Listener to enable submitting the search by hitting enter'
      },
      {
        name: 'onInputFocus',
        docblock: 'Selects all of the text when the input is focused',
        modifiers: [],
        params: [],
        returns: null,
        description: 'Selects all of the text when the input is focused'
      }
    ],
    props: [
      {
        name: 'placeholder',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The placeholder text for the input.  Defaults to "Search..."',
          defaultValue: { value: "'Search...'", computed: false }
        }
      },
      {
        name: 'closeButtonText',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'Set this prop to use a text button instead of an icon for the close button.  If set, CloseButtonIcon\nwill be ignored'
        }
      },
      {
        name: 'CloseButtonIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'Overrides the default close icon.  Takes a React component.',
          defaultValue: { value: '() => <ClearIcon />', computed: false }
        }
      },
      {
        name: 'blurBackground',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to false to disable background blurring.  Defaults to true.',
          defaultValue: { value: 'true', computed: false }
        }
      },
      {
        name: 'searchButtonVariant',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'icon'", computed: false }, { value: "'fab'", computed: false }]
          },
          required: false,
          description:
            'Set to "icon" to display the search button as an icon in the search input.\nSet to "fab" to display the search button as a separate floating action button to the right of the search input when\nthe user enters text.',
          defaultValue: { value: "'fab'", computed: false }
        }
      },
      {
        name: 'showClearButton',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to false to never show the clear button.  The search icon will be shown inside the input even when the user has entered text.',
          defaultValue: { value: 'true', computed: false }
        }
      }
    ],
    styles: {
      classes: [
        'root',
        'paper',
        'paperAnchorBottom',
        'wrap',
        'header',
        'closeButton',
        'closeButtonText',
        'searchField',
        'searchInput',
        'groupCaption',
        'group',
        'thumbnailGroup',
        'thumbnail',
        'results',
        'loading',
        'searchFab'
      ],
      name: 'RSFSearchDrawer'
    }
  },
  SearchField: {
    id: 'SearchField',
    filename: 'SearchField',
    importPath: 'SearchField',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { InputAdornment, TextField, withStyles } from '@material-ui/core'\nimport Search from '@material-ui/icons/Search'\n\nexport const styles = theme => ({\n  input: {\n    paddingTop: '10px',\n    paddingBottom: '10px'\n  }\n})\n\n@withStyles(styles, { name: 'RSFSearchField' })\nexport default class SearchField extends Component {\n  render() {\n    const { classes, ...others } = this.props\n\n    return (\n      <TextField\n        variant=\"outlined\"\n        type=\"search\"\n        placeholder=\"Search\"\n        InputProps={{\n          startAdornment: (\n            <InputAdornment position=\"start\">\n              <Search />\n            </InputAdornment>\n          ),\n          margin: 'dense',\n          classes\n        }}\n        {...others}\n      />\n    )\n  }\n}\n",
    description: '',
    displayName: 'SearchField',
    methods: [],
    styles: { classes: ['input'], name: 'RSFSearchField' },
    props: []
  },
  SearchPopup: {
    id: 'SearchPopup',
    filename: 'SearchPopup',
    importPath: 'SearchPopup',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Button from '@material-ui/core/Button'\nimport Input from '@material-ui/core/Input'\nimport IconButton from '@material-ui/core/IconButton'\nimport SearchIcon from '@material-ui/icons/Search'\nimport SearchReset from '@material-ui/icons/Clear'\nimport Typography from '@material-ui/core/Typography'\nimport { types } from 'mobx-state-tree'\nimport PropTypes from 'prop-types'\nimport Highlight from 'react-highlighter'\nimport CircularProgress from '@material-ui/core/CircularProgress'\nimport Link from './Link'\nimport { PropTypes as MobxPropTypes, inject, observer } from 'mobx-react'\nimport Image from './Image'\n\n/**\n * A search popup with suggestions of search texts, categories, products.\n * can be used like composition\n * <SearchPopup>\n *   <SuggestedSearch />\n *   <CategorySearches />\n *   <ProductSuggestions />\n * </SearchPopup>\n */\nexport const styles = theme => ({\n  searchPopup: {\n    position: 'fixed',\n    top: 0,\n    bottom: 0,\n    left: 0,\n    right: 0,\n    backgroundColor: 'rgba(255, 255, 255, .8)',\n    zIndex: 9999,\n    padding: '20px'\n  },\n  closeButton: {\n    backgroundColor: theme.palette.white,\n    border: `1px solid ${theme.palette.border}`,\n    '& span': {\n      textTransform: 'uppercase',\n      fontWeight: 'bold'\n    }\n  },\n  searchForm: {\n    display: 'flex',\n    marginTop: '20px',\n    position: 'relative'\n  },\n  searchReset: {\n    position: 'absolute',\n    top: 0,\n    right: '50px'\n  },\n  flexInput: {\n    flexGrow: 1,\n    backgroundColor: theme.palette.secondary.light,\n    boxSizing: 'border-box',\n    height: 48,\n    padding: '8px 12px 8px 12px'\n  },\n  searchButton: {\n    backgroundColor: theme.palette.darkButton,\n    borderRadius: 0,\n    '& svg': {\n      fill: theme.palette.white\n    }\n  },\n  suggestionHeader: {\n    textTransform: 'uppercase',\n    marginTop: '40px'\n  },\n  suggestionsList: {\n    listStyle: 'none',\n    margin: 0,\n    padding: 0,\n    '& a strong': {\n      fontWeight: 'bold',\n      color: theme.palette.text.primary\n    }\n  },\n  productImage: {\n    height: '120px',\n    width: '120px',\n    display: 'block',\n    marginBottom: '15px'\n  },\n  productsSuggestions: {\n    display: 'flex',\n    listStyle: 'none',\n    margin: 0,\n    padding: 0,\n    overflowX: 'auto',\n    '& > li': {\n      margin: '5px'\n    }\n  },\n  searchResultsWrapper: {\n    position: 'absolute',\n    top: '125px',\n    bottom: 0,\n    overflowY: 'auto',\n    left: '20px',\n    right: 0\n  },\n  loading: {\n    paddingTop: '20%',\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center'\n  }\n})\n\n@withStyles(styles, { name: 'RSFSearchPopup' })\n@inject(({ app: { searchPopup, search }, history }) => ({ searchPopup, search, history }))\n@observer\nexport default class SearchPopup extends Component {\n  state = {\n    search: ''\n  }\n\n  static defaultProps = {\n    suggestionResultsLimit: 3\n  }\n\n  static propTypes = {\n    /**\n     * searchPopup holds state of popup\n     */\n    searchPopup: PropTypes.shape({\n      opened: PropTypes.bool.isRequired\n    }),\n    /**\n     * search contains lists of suggestions\n     */\n    search: PropTypes.shape({\n      searches: MobxPropTypes.arrayOrObservableArrayOf(\n        PropTypes.shape({\n          text: PropTypes.string\n        })\n      ),\n      categories: MobxPropTypes.arrayOrObservableArrayOf(\n        PropTypes.shape({\n          id: PropTypes.string,\n          url: PropTypes.string,\n          name: PropTypes.string\n        })\n      ),\n      products: MobxPropTypes.arrayOrObservableArrayOf(\n        PropTypes.shape({\n          id: PropTypes.string,\n          url: PropTypes.string,\n          name: PropTypes.string,\n          image: PropTypes.string\n        })\n      )\n    }),\n\n    /**\n     * limit for suggestion results list\n     */\n    suggestionResultsLimit: PropTypes.number,\n\n    /**\n     * Suggestion results components\n     */\n    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,\n\n    history: PropTypes.shape({\n      push: PropTypes.func.isRequired\n    })\n  }\n\n  onChangeSearchText = text => {\n    const { search } = this.props\n    this.setState({ search: text })\n    // only apply loading spinner if there is some text\n    // in case of input clearing we rejecting previous requests so they won't fire loading flag reset\n    // that's why we're doing this here\n    search.setLoading(!!text)\n    search.run(text)\n  }\n\n  hidePopup = () => {\n    const { searchPopup } = this.props\n    searchPopup.setIsPopupOpened(false)\n    this.onChangeSearchText('')\n  }\n\n  onSearchSubmit = event => {\n    const { history } = this.props\n    event.preventDefault()\n    history.push(`/search?text=${this.state.search}`)\n    this.hidePopup()\n  }\n\n  render() {\n    const { searchPopup, classes, search, children, suggestionResultsLimit } = this.props\n    const searches = [...search.searches].splice(0, suggestionResultsLimit)\n    const categories = [...search.categories].splice(0, suggestionResultsLimit)\n    const results = React.Children.map(children, list =>\n      React.cloneElement(list, {\n        searches,\n        classes,\n        categories,\n        products: search.products,\n        searchText: this.state.search,\n        hidePopup: this.hidePopup\n      })\n    )\n\n    const loading = search.loading\n    const contentReady = this.state.search && !loading\n\n    return (\n      <form\n        onSubmit={this.onSearchSubmit}\n        onReset={() => {\n          this.onChangeSearchText('')\n        }}\n      >\n        {searchPopup.opened && (\n          <div className={classes.searchPopup}>\n            <Button className={classes.closeButton} variant=\"contained\" onClick={this.hidePopup}>\n              Cancel\n            </Button>\n            <div className={classes.searchForm}>\n              <Input\n                type=\"text\"\n                className={classes.flexInput}\n                value={this.state.search}\n                onChange={e => {\n                  this.onChangeSearchText(e.target.value)\n                }}\n              />\n              <IconButton variant=\"contained\" type=\"submit\" className={classes.searchButton}>\n                <SearchIcon />\n              </IconButton>\n              {this.state.search && (\n                <IconButton type=\"reset\" className={classes.searchReset}>\n                  <SearchReset />\n                </IconButton>\n              )}\n            </div>\n            {loading && (\n              <div className={classes.loading}>\n                <CircularProgress />\n              </div>\n            )}\n            {contentReady && <div className={classes.searchResultsWrapper}>{results}</div>}\n          </div>\n        )}\n      </form>\n    )\n  }\n}\n\nconst commonPropTypes = {\n  hidePopup: PropTypes.func,\n  classes: PropTypes.shape({\n    suggestionHeader: PropTypes.string,\n    suggestionsList: PropTypes.string\n  })\n}\n\n/**\n * Search text suggestions\n * @param props\n * @constructor\n */\nexport const SuggestedSearch = props => (\n  <React.Fragment>\n    <Typography component=\"h2\" className={props.classes.suggestionHeader}>\n      Suggested search\n    </Typography>\n    <ul className={props.classes.suggestionsList}>\n      {props.searches.map((item, i) => (\n        <li key={i}>\n          <Link to={`/search?text=${item.text}`} onClick={props.hidePopup}>\n            <Highlight search={props.searchText}>{item.text}</Highlight>\n          </Link>\n        </li>\n      ))}\n    </ul>\n  </React.Fragment>\n)\n\nSuggestedSearch.propTypes = {\n  ...commonPropTypes,\n  searches: MobxPropTypes.arrayOrObservableArrayOf(\n    PropTypes.shape({\n      text: PropTypes.string\n    })\n  ),\n  searchText: PropTypes.string\n}\n\n/**\n * Search categories suggestions\n * @param props\n * @constructor\n */\nexport const CategorySearches = props => (\n  <React.Fragment>\n    <Typography component=\"h2\" className={props.classes.suggestionHeader}>\n      Category searches\n    </Typography>\n    <ul className={props.classes.suggestionsList}>\n      {props.categories.map(item => (\n        <li key={item.id}>\n          <Link to={item.url} onClick={props.hidePopup}>\n            {item.name}\n          </Link>\n        </li>\n      ))}\n    </ul>\n  </React.Fragment>\n)\n\nCategorySearches.propTypes = {\n  ...commonPropTypes,\n  categories: MobxPropTypes.arrayOrObservableArrayOf(\n    PropTypes.shape({\n      id: PropTypes.string,\n      url: PropTypes.string,\n      name: PropTypes.string\n    })\n  )\n}\n\n/**\n * Search products suggestions\n * @param props\n * @constructor\n */\nexport const ProductSuggestions = props => (\n  <React.Fragment>\n    <Typography component=\"h2\" className={props.classes.suggestionHeader}>\n      Product suggestions\n    </Typography>\n    <ul className={props.classes.productsSuggestions}>\n      {props.products.map(item => (\n        <li key={item.id}>\n          <Link to={item.url} onClick={props.hidePopup} className={props.classes.productImage}>\n            <Image fill src={item.thumbnail} alt={item.name} />\n          </Link>\n          <Link to={item.url} onClick={props.hidePopup}>\n            {item.name}\n          </Link>\n        </li>\n      ))}\n    </ul>\n  </React.Fragment>\n)\n\nProductSuggestions.propTypes = {\n  ...commonPropTypes,\n  products: MobxPropTypes.arrayOrObservableArrayOf(\n    PropTypes.shape({\n      id: PropTypes.string,\n      url: PropTypes.string,\n      name: PropTypes.string,\n      thumbnail: PropTypes.string\n    })\n  )\n}\n\n/**\n * Search popup model\n */\nexport const SearchPopupModel = types\n  .model('SearchPopupModel', {\n    opened: types.boolean\n  })\n  .actions(self => ({\n    setIsPopupOpened(status) {\n      self.opened = status\n      return self\n    }\n  }))\n",
    description: '',
    displayName: 'SearchPopup',
    methods: [
      {
        name: 'onChangeSearchText',
        docblock: null,
        modifiers: [],
        params: [{ name: 'text', type: null }],
        returns: null
      },
      { name: 'hidePopup', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'onSearchSubmit',
        docblock: null,
        modifiers: [],
        params: [{ name: 'event', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'searchPopup',
        props: {
          type: { name: 'shape', value: { opened: { name: 'bool', required: true } } },
          required: false,
          description: 'searchPopup holds state of popup'
        }
      },
      {
        name: 'search',
        props: {
          type: {
            name: 'shape',
            value: {
              searches: {
                name: 'custom',
                raw:
                  'MobxPropTypes.arrayOrObservableArrayOf(\n  PropTypes.shape({\n    text: PropTypes.string\n  })\n)',
                required: false
              },
              categories: {
                name: 'custom',
                raw:
                  'MobxPropTypes.arrayOrObservableArrayOf(\n  PropTypes.shape({\n    id: PropTypes.string,\n    url: PropTypes.string,\n    name: PropTypes.string\n  })\n)',
                required: false
              },
              products: {
                name: 'custom',
                raw:
                  'MobxPropTypes.arrayOrObservableArrayOf(\n  PropTypes.shape({\n    id: PropTypes.string,\n    url: PropTypes.string,\n    name: PropTypes.string,\n    image: PropTypes.string\n  })\n)',
                required: false
              }
            }
          },
          required: false,
          description: 'search contains lists of suggestions'
        }
      },
      {
        name: 'suggestionResultsLimit',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'limit for suggestion results list',
          defaultValue: { value: '3', computed: false }
        }
      },
      {
        name: 'children',
        props: {
          type: {
            name: 'union',
            value: [{ name: 'arrayOf', value: { name: 'node' } }, { name: 'node' }]
          },
          required: true,
          description: 'Suggestion results components'
        }
      },
      {
        name: 'history',
        props: {
          type: { name: 'shape', value: { push: { name: 'func', required: true } } },
          required: false,
          description: ''
        }
      }
    ],
    styles: {
      classes: [
        'searchPopup',
        'closeButton',
        'searchForm',
        'searchReset',
        'flexInput',
        'searchButton',
        'suggestionHeader',
        'suggestionsList',
        'productImage',
        'productsSuggestions',
        'searchResultsWrapper',
        'loading'
      ],
      name: 'RSFSearchPopup'
    }
  },
  ShowMore: {
    id: 'ShowMore',
    filename: 'ShowMore',
    importPath: 'ShowMore',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport Button from '@material-ui/core/Button'\nimport CircularProgress from '@material-ui/core/CircularProgress'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport { observer, inject } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\nimport VisibilitySensor from 'react-visibility-sensor'\n\nexport const styles = theme => ({\n  root: {\n    margin: '15px 0',\n    width: '100%'\n  },\n  loading: {\n    display: 'flex',\n    justifyContent: 'center'\n  }\n})\n\n/**\n * The ShowMore component controls pagination for views that display a SearchResultsModelBase (specified via the model prop).\n * This component uses either the total or numberOfPages fields on SearchResultsModelBase to determine whether or not\n * to trigger show more. The default variant is a button with text/contents can be changed by specifying a child (string or components).\n * Or this component can be configured to use infinite scrolling for triggering another page.\n */\n@withStyles(styles, { name: 'RSFShowMore' })\n@inject('app')\n@observer\nexport default class ShowMore extends Component {\n  static propTypes = {\n    /**\n     * A renderer for the loading icon.  Uses CircularPropgress by default\n     */\n    loading: PropTypes.func,\n\n    /**\n     * An instance of `SearchResultModelBase`\n     */\n    model: PropTypes.object,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * When infiniteScroll is set to true, this prop describes how near to the bottom of the page in pixels the user must scroll before the next page is fetched.\n     */\n    offset: PropTypes.number,\n\n    /**\n     * Set to true to automatically fetch the next page when the user scrolls to the bottom of the page instead of displaying a \"Show More\" button.\n     */\n    infiniteScroll: PropTypes.bool\n  }\n\n  static defaultProps = {\n    Loading: () => <CircularProgress />,\n    offset: 100\n  }\n\n  onVisibilityChange = isVisible => {\n    const { model } = this.props\n\n    if (isVisible && !model.loadingMore) {\n      model.showMore()\n    }\n  }\n\n  render() {\n    const {\n      app,\n      Loading,\n      model,\n      classes,\n      className,\n      children,\n      infiniteScroll,\n      offset,\n      ...others\n    } = this.props\n\n    if (model.loadingMore) {\n      return (\n        <div className={classnames(classes.loading, classes.root)}>\n          <Loading />\n        </div>\n      )\n    } else if (model.hasMoreItems) {\n      if (infiniteScroll && !app.amp) {\n        return (\n          <VisibilitySensor\n            key={model.page}\n            offset={{ bottom: -offset }}\n            onChange={this.onVisibilityChange}\n          >\n            <div style={{ width: 1, height: 1 }} />\n          </VisibilitySensor>\n        )\n      }\n      return (\n        <Button\n          variant=\"contained\"\n          color=\"primary\"\n          href={\n            app.amp\n              ? `${app.location.pathname.replace(/\\.amp/, '')}?page=1#item-${model.pageSize}`\n              : null\n          }\n          className={classnames(classes.root, className)}\n          onClick={model.showMore}\n          {...others}\n        >\n          {children || 'Show More'}\n        </Button>\n      )\n    } else {\n      return null\n    }\n  }\n}\n",
    description:
      'The ShowMore component controls pagination for views that display a SearchResultsModelBase (specified via the model prop).\nThis component uses either the total or numberOfPages fields on SearchResultsModelBase to determine whether or not\nto trigger show more. The default variant is a button with text/contents can be changed by specifying a child (string or components).\nOr this component can be configured to use infinite scrolling for triggering another page.',
    displayName: 'ShowMore',
    methods: [
      {
        name: 'onVisibilityChange',
        docblock: null,
        modifiers: [],
        params: [{ name: 'isVisible', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'loading',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'A renderer for the loading icon.  Uses CircularPropgress by default'
        }
      },
      {
        name: 'model',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'An instance of `SearchResultModelBase`'
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'offset',
        props: {
          type: { name: 'number' },
          required: false,
          description:
            'When infiniteScroll is set to true, this prop describes how near to the bottom of the page in pixels the user must scroll before the next page is fetched.',
          defaultValue: { value: '100', computed: false }
        }
      },
      {
        name: 'infiniteScroll',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to automatically fetch the next page when the user scrolls to the bottom of the page instead of displaying a "Show More" button.'
        }
      },
      {
        name: 'Loading',
        props: {
          defaultValue: { value: '() => <CircularProgress />', computed: false },
          required: false
        }
      }
    ],
    styles: { classes: ['root', 'loading'], name: 'RSFShowMore' }
  },
  Skeleton: {
    id: 'Skeleton',
    filename: 'Skeleton',
    importPath: 'Skeleton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport classnames from 'classnames'\nimport ResponsiveTiles from './ResponsiveTiles'\nimport PropTypes from 'prop-types'\nimport withStyleProps from './withStyleProps'\nimport { observer, inject } from 'mobx-react'\nimport Image from './Image'\n\nexport const styles = theme => ({\n  row: {\n    display: 'flex',\n    flexDirection: 'row',\n    alignItems: 'stretch'\n  },\n\n  blankRow: {\n    height: `${theme.margins.row}px`\n  },\n\n  space: {\n    backgroundColor: theme.palette.background.default,\n    width: theme.margins.container + 'px'\n  },\n\n  '@keyframes shimmer': {\n    from: { backgroundPosition: '0 0' },\n    to: { backgroundPosition: '100vw 0' }\n  },\n\n  shimmer: {\n    backgroundColor: theme.palette.background.shade,\n    animationDuration: '1s',\n    animationFillMode: 'forwards',\n    animationIterationCount: 'infinite',\n    animationName: 'shimmer',\n    animationTimingFunction: 'linear',\n    background: `linear-gradient(to right, #eee 0%, #e6e6e6 20%, #eee 40%)`\n  },\n\n  fullscreen: {\n    position: 'absolute',\n    left: 0,\n    right: 0,\n    bottom: 0,\n    top: theme.headerHeight\n  },\n\n  filledContent: {\n    backgroundColor: theme.palette.background.default,\n    display: 'flex',\n    alignItems: 'center'\n  }\n})\n\n/**\n * The root component for a skeleton view\n */\nexport const Skeleton = withStyles(styles)(({ classes, children, fullscreen = false }) => (\n  <div\n    className={classnames({\n      [classes.shimmer]: true,\n      [classes.fullscreen]: fullscreen\n    })}\n  >\n    {children}\n  </div>\n))\n\n/**\n * A row of space and content\n */\nexport const Row = withStyles(styles)(({ wrap, className, classes, children, ...style }) => (\n  <div\n    className={classnames(classes.row, className)}\n    style={{ flexWrap: wrap && 'wrap', ...style }}\n  >\n    {children}\n  </div>\n))\n\n/**\n * White space between content\n */\nexport const Space = withStyles(styles)(({ classes, ...style }) => (\n  <div data-rel=\"space\" className={classes.space} style={style} />\n))\n\n/**\n * A placeholder for content with a gray background that shimmers\n */\nexport const Content = withStyles(styles)(({ children, className, classes, ...style }) => {\n  if (children) {\n    return (\n      <div className={classnames(className, classes.filledContent)} style={{ ...style }}>\n        {children}\n      </div>\n    )\n  } else {\n    return <div className={className} style={{ ...style }} />\n  }\n})\n\n/**\n * A blank row.  You provide the height\n */\nexport const BlankRow = withStyles(styles)(({ classes, ...others }) => (\n  <Row className={classes.blankRow} {...others}>\n    <Space flex={1} />\n  </Row>\n))\n\n/**\n * When using ResposiveTiles in your view, use this component to replace\n * it in the load mask.\n */\n@withStyleProps(\n  ({ theme, spacing }) => ({\n    root: {\n      borderStyle: 'solid',\n      borderColor: theme.palette.background.default,\n      margin: `0 -${spacing}px !important`\n    },\n    tile: {\n      borderStyle: 'solid',\n      borderColor: theme.palette.background.default,\n      borderWidth: `0 ${spacing / 2}px`\n    }\n  }),\n  { name: 'RSFSkeletonTiles' }\n)\nexport class Tiles extends Component {\n  static propTypes = {\n    /**\n     * Should be the same as the spacing set on the ResponsiveTiles element\n     * that you're replacing.\n     */\n    spacing: PropTypes.number\n  }\n\n  render() {\n    const { spacing, classes, className, children, ...others } = this.props\n\n    return (\n      <ResponsiveTiles spacing={0} className={classnames(classes.root, className)} {...others}>\n        {React.Children.map(children, (child, i) => (\n          <div className={classes.tile} key={i}>\n            {child}\n          </div>\n        ))}\n      </ResponsiveTiles>\n    )\n  }\n}\n\nTiles.defaultProps = {\n  spacing: 15\n}\n\n@withStyles(theme => ({\n  root: {\n    display: 'flex',\n    flexDirection: 'column'\n  },\n  image: {\n    width: '100%',\n    flex: 1\n  }\n}))\n@observer\nexport class ImageSwitcher extends Component {\n  static propTypes = {\n    product: PropTypes.object,\n    thumbnails: PropTypes.bool,\n    loadingThumbnailProps: PropTypes.object\n  }\n\n  static defaultProps = {\n    thumbnails: true,\n    loadingThumbnailProps: {}\n  }\n\n  render() {\n    const { classes, thumbnails, product, loadingThumbnailProps } = this.props\n\n    return (\n      <div className={classes.root}>\n        {product && product.thumbnail ? (\n          <Row>\n            <Content flex=\"1\">\n              <Image\n                src={product.thumbnail}\n                className={classes.image}\n                {...loadingThumbnailProps}\n                fill\n              />\n            </Content>\n          </Row>\n        ) : (\n          <Row className={classes.image} />\n        )}\n        {thumbnails ? (\n          <Fragment>\n            <BlankRow />\n            <Row height=\"58px\">\n              <Space />\n              <Content flex=\"1\" />\n              <Space />\n            </Row>\n          </Fragment>\n        ) : null}\n      </div>\n    )\n  }\n}\n",
    description: 'The root component for a skeleton view',
    methods: [],
    props: [
      {
        name: 'fullscreen',
        props: { defaultValue: { value: 'false', computed: false }, required: false }
      }
    ],
    styles: { classes: [], name: null }
  },
  Sort: {
    id: 'Sort',
    filename: 'Sort',
    importPath: 'Sort',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport { inject, observer } from 'mobx-react'\nimport Button from '@material-ui/core/Button'\nimport MenuItem from '@material-ui/core/MenuItem'\nimport PropTypes from 'prop-types'\nimport Hidden from '@material-ui/core/Hidden'\n\n/**\n * UI for sorting an instance of SearchResultModelBase.  This component can be used on its own, or you can use\n * SortButton to automatically display this component in a drawer that slides up from the bottom of the viewport.\n */\nexport const styles = theme => ({\n  container: {\n    padding: '15px 0 0 15px'\n  },\n  option: {\n    boxShadow: 'none',\n    width: 'calc(50% - 15px)',\n    margin: '0 15px 15px 0'\n  }\n})\n\n@withStyles(styles, { name: 'RSFSort' })\n@inject('router')\n@observer\nexport default class Sort extends Component {\n  static propTypes = {\n    /**\n     * A function to call when a sort option is selected.  The option and event are passed.\n     * The default behavior can be prevented by called `preventDefault()` on the passed in event.\n     */\n    onSelect: PropTypes.func,\n\n    /**\n     * A instance of SearchResultsModelBase\n     */\n    model: PropTypes.object,\n\n    /**\n     * The query string parameter that should be updated when the sort is changed.  The value will the\n     * code corresponding to the selected sortOption.  Defaults to \"sort\".\n     */\n    queryParam: PropTypes.string,\n\n    /**\n     * Controls how sort options are displayed.  Can be \"menu-items\" or \"buttons\".  Defaults to \"buttons\"\n     */\n    variant: PropTypes.oneOf(['menu-items', 'buttons'])\n  }\n\n  static defaultProps = {\n    onSelect: Function.prototype,\n    queryParam: 'sort',\n    variant: 'buttons'\n  }\n\n  render() {\n    const { variant } = this.props\n\n    Hidden\n\n    if (variant === 'buttons') {\n      return this.renderButtons()\n    } else if (variant === 'menu-items') {\n      return this.renderMenu()\n    } else {\n      return null\n    }\n  }\n\n  renderButtons() {\n    const { model, classes } = this.props\n    const options = model.sortOptions\n\n    return (\n      <div className={classes.container} onClick={this.handleSort}>\n        {options &&\n          options.map((option, i) => (\n            <Button\n              className={classes.option}\n              color={model.sort === option.code ? 'primary' : 'default'}\n              variant=\"contained\"\n              onClick={this.onClick.bind(this, option)}\n              key={i}\n            >\n              {option.name}\n            </Button>\n          ))}\n      </div>\n    )\n  }\n\n  renderMenu() {\n    const { model } = this.props\n    const options = model.sortOptions\n\n    return (\n      <Fragment>\n        {options &&\n          options.map((option, i) => (\n            <MenuItem key={i} onClick={this.onClick.bind(this, option)}>\n              {option.name}\n            </MenuItem>\n          ))}\n      </Fragment>\n    )\n  }\n\n  onClick = (option, e) => {\n    const { onSelect, model, queryParam, router } = this.props\n    onSelect(option, e)\n\n    if (!e.isDefaultPrevented()) {\n      router.applySearch({ [queryParam]: option.code })\n      model.setSort(option)\n      model.refresh()\n    }\n  }\n}\n",
    description: '',
    displayName: 'Sort',
    methods: [
      { name: 'renderButtons', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'renderMenu', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'onClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'option', type: null }, { name: 'e', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'onSelect',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            'A function to call when a sort option is selected.  The option and event are passed.\nThe default behavior can be prevented by called `preventDefault()` on the passed in event.',
          defaultValue: { value: 'Function.prototype', computed: true }
        }
      },
      {
        name: 'model',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'A instance of SearchResultsModelBase'
        }
      },
      {
        name: 'queryParam',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The query string parameter that should be updated when the sort is changed.  The value will the\ncode corresponding to the selected sortOption.  Defaults to "sort".',
          defaultValue: { value: "'sort'", computed: false }
        }
      },
      {
        name: 'variant',
        props: {
          type: {
            name: 'enum',
            value: [
              { value: "'menu-items'", computed: false },
              { value: "'buttons'", computed: false }
            ]
          },
          required: false,
          description:
            'Controls how sort options are displayed.  Can be "menu-items" or "buttons".  Defaults to "buttons"',
          defaultValue: { value: "'buttons'", computed: false }
        }
      }
    ],
    styles: { classes: ['container', 'option'], name: 'RSFSort' }
  },
  SortButton: {
    id: 'SortButton',
    filename: 'SortButton',
    importPath: 'SortButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport ActionButton from './ActionButton'\nimport Sort from './Sort'\nimport PropTypes from 'prop-types'\nimport Drawer from './Drawer'\nimport Hidden from '@material-ui/core/Hidden'\nimport Menu from '@material-ui/core/Menu'\n\n/**\n * A button that when clicked, opens a drawer containing the `Sort` view. The name of the currently\n * selected sortOption is display in the button text.\n */\n@inject('app')\n@observer\nexport default class SortButton extends Component {\n  static propTypes = {\n    /**\n     * A instance of SearchResultsModelBase\n     */\n    model: PropTypes.object,\n\n    /**\n     * CSS classes\n     */\n    classes: PropTypes.object,\n\n    /**\n     * Sets the type of control displayed when the menu is clicked\n     */\n    variant: PropTypes.oneOf(['drawer', 'menu']),\n\n    /**\n     * Props to pass to the underlying `Drawer` component.\n     */\n    drawerProps: PropTypes.object,\n\n    /**\n     * Props to pass to the underlying `Sort` component.\n     */\n    sortProps: PropTypes.object,\n\n    /**\n     * Text for the button label and the drawer header.  Defaults to \"Sort\".\n     */\n    title: PropTypes.string\n  }\n\n  static defaultProps = {\n    title: 'Sort',\n    variant: 'drawer',\n    drawerProps: {},\n    sortProps: {}\n  }\n\n  constructor({ app, variant }) {\n    super()\n\n    const open = variant === 'drawer' && app.location.search.indexOf('openSort') !== -1\n\n    this.state = {\n      open,\n      mountDrawer: open,\n      anchorEl: null\n    }\n  }\n\n  render() {\n    const { app, variant, model, title, drawerProps, sortProps, ...props } = this.props\n    const { open, mountDrawer, anchorEl } = this.state\n    const selectedOption = model.sortOptions.find(o => model.sort === o.code)\n\n    return (\n      <Fragment>\n        <ActionButton\n          key=\"button\"\n          href={app.amp ? `${app.location.pathname.replace(/\\.amp/, '')}?openSort` : null}\n          label={title}\n          value={selectedOption && selectedOption.name}\n          {...props}\n          onClick={this.onClick}\n        />\n        {!app.amp && variant === 'drawer' && (\n          <Hidden smUp>\n            <Drawer\n              ModalProps={{\n                keepMounted: true\n              }}\n              key=\"drawer\"\n              anchor=\"bottom\"\n              title={title}\n              open={open}\n              onRequestClose={this.toggleOpen.bind(this, false)}\n              {...drawerProps}\n            >\n              {mountDrawer && <Sort model={model} onSelect={this.onSelect} {...sortProps} />}\n            </Drawer>\n          </Hidden>\n        )}\n        {!app.amp && variant === 'menu' && (\n          <Hidden xsDown>\n            <Menu open={open} anchorEl={anchorEl} onClose={this.close}>\n              <Sort variant=\"menu-items\" model={model} onSelect={this.onSelect} {...sortProps} />\n            </Menu>\n          </Hidden>\n        )}\n      </Fragment>\n    )\n  }\n\n  onClick = e => {\n    if (this.props.onClick) {\n      this.props.onClick(e)\n    }\n\n    if (!e.defaultPrevented) {\n      this.toggleOpen(true, e.currentTarget)\n    }\n  }\n\n  close = () => {\n    this.toggleOpen(false)\n  }\n\n  toggleOpen = (open, anchorEl) => {\n    if (open) {\n      this.setState({ mountDrawer: true, open: true, anchorEl })\n    } else {\n      this.setState({ open: false, anchorEl: null })\n    }\n  }\n\n  onSelect = () => {\n    this.toggleOpen(false)\n  }\n}\n",
    description:
      'A button that when clicked, opens a drawer containing the `Sort` view. The name of the currently\nselected sortOption is display in the button text.',
    displayName: 'SortButton',
    methods: [
      {
        name: 'onClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      },
      { name: 'close', docblock: null, modifiers: [], params: [], returns: null },
      {
        name: 'toggleOpen',
        docblock: null,
        modifiers: [],
        params: [{ name: 'open', type: null }, { name: 'anchorEl', type: null }],
        returns: null
      },
      { name: 'onSelect', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'model',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'A instance of SearchResultsModelBase'
        }
      },
      {
        name: 'classes',
        props: { type: { name: 'object' }, required: false, description: 'CSS classes' }
      },
      {
        name: 'variant',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'drawer'", computed: false }, { value: "'menu'", computed: false }]
          },
          required: false,
          description: 'Sets the type of control displayed when the menu is clicked',
          defaultValue: { value: "'drawer'", computed: false }
        }
      },
      {
        name: 'drawerProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props to pass to the underlying `Drawer` component.',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'sortProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props to pass to the underlying `Sort` component.',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'title',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'Text for the button label and the drawer header.  Defaults to "Sort".',
          defaultValue: { value: "'Sort'", computed: false }
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  Spacer: {
    id: 'Spacer',
    filename: 'Spacer',
    importPath: 'Spacer',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\n\n/**\n * Renders a simple div with flex: 1 to be used as a spacer.  Since this is a\n * common case, the main purposed of this class is to minimize the amount of\n * css generated for an app.\n */\nexport const styles = theme => ({\n  root: {\n    flex: 1\n  }\n})\n\n@withStyles(styles, { name: 'RSFSpacer' })\nexport default class Spacer extends Component {\n  render() {\n    return <div className={this.props.classes.root} />\n  }\n}\n",
    description: '',
    displayName: 'Spacer',
    methods: [],
    styles: { classes: ['root'], name: 'RSFSpacer' },
    props: []
  },
  SubcategoryLink: {
    id: 'SubcategoryLink',
    filename: 'SubcategoryLink',
    importPath: 'SubcategoryLink',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PageLink from './PageLink'\nimport PropTypes from 'prop-types'\n\n/**\n * A link to a subcategory that automatically pushes the product's thumbnail into the product skeleton\n * via AppModelBase.loadingProduct. The subcategory prop accepts an instance of SubcategoryModelBase or any\n * model that implements createLinkState(). This components wraps react-storefront/Link and supports all of its props.\n */\nexport default class SubcategoryLink extends Component {\n  static propTypes = {\n    /**\n     * An instance of SubcategoryModelBase\n     */\n    subcategory: PropTypes.object.isRequired\n  }\n\n  render() {\n    const { subcategory, ...others } = this.props\n    return <PageLink page=\"Subcategory\" model={subcategory} {...others} />\n  }\n}\n",
    description:
      "A link to a subcategory that automatically pushes the product's thumbnail into the product skeleton\nvia AppModelBase.loadingProduct. The subcategory prop accepts an instance of SubcategoryModelBase or any\nmodel that implements createLinkState(). This components wraps react-storefront/Link and supports all of its props.",
    displayName: 'SubcategoryLink',
    methods: [],
    props: [
      {
        name: 'subcategory',
        props: {
          type: { name: 'object' },
          required: true,
          description: 'An instance of SubcategoryModelBase'
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  TabPanel: {
    id: 'TabPanel',
    filename: 'TabPanel',
    importPath: 'TabPanel',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport { Helmet } from 'react-helmet'\nimport Tabs from '@material-ui/core/Tabs'\nimport Tab from '@material-ui/core/Tab'\nimport { inject } from 'mobx-react'\nimport classnames from 'classnames'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  root: {},\n  panel: {\n    margin: `${theme.margins.container}px 0`\n  },\n  hidden: {\n    display: 'none'\n  },\n  ampSelector: {\n    '& [option][selected]': {\n      outline: 'none',\n      cursor: 'inherit'\n    }\n  },\n  ampPanel: {\n    display: 'none',\n    '&[selected]': {\n      display: 'block'\n    }\n  },\n  ampTab: {\n    opacity: 1,\n    '& .label': {\n      borderBottom: `2px solid transparent`,\n      opacity: 0.7,\n      padding: '15px 12px 14px 12px'\n    },\n    '& .selected': {\n      borderBottom: `2px solid ${theme.palette.secondary.main}`,\n      opacity: 1\n    }\n  },\n  ampTabLabelContainer: {\n    padding: 0\n  },\n  ampTabIndicator: {\n    display: 'none'\n  }\n})\n\n/**\n * A simple tab panel that is AMP-compatible.  Tab names are pull from the label prop of the child elements.\n * Any type of element can be a child.\n *\n * Example:\n *\n *  <TabPanel>\n *    <div label=\"Description\">\n *      Description here\n *    </div>\n *    <CmsSlot label=\"Instructions\">\n *      { instructionsFromCms }\n *    </CmsSlot>\n *  </TabPanel>\n */\n@withStyles(styles, { name: 'RSFTabPanel' })\n@inject('app', 'ampStateId')\nexport default class TabPanel extends Component {\n  constructor(props) {\n    super(props)\n    this.state = {\n      selected: props.selected\n    }\n  }\n\n  static propTypes = {\n    /**\n     * Set to false to prevent the tabs from scrolling\n     */\n    scrollable: PropTypes.bool,\n    /**\n     * Selected tab index\n     */\n    selected: PropTypes.number,\n    /**\n     * On change callback\n     */\n    onChange: PropTypes.func\n  }\n\n  static defaultProps = {\n    ampStateId: 'moovAmpState',\n    ampStateProperty: 'selectedTab',\n    variant: 'scrollable',\n    selected: 0\n  }\n\n  componentWillReceiveProps(nextProps) {\n    if (typeof nextProps.selected === 'number') {\n      this.setState({ selected: nextProps.selected })\n    }\n  }\n\n  render() {\n    const { selected } = this.state\n    const { children, classes, app, ampStateId, ampStateProperty, scrollable } = this.props\n    const { amp } = app\n\n    let panels = []\n    const tabs = []\n\n    React.Children.forEach(children, (child, i) => {\n      let { label } = child.props\n\n      if (amp) {\n        label = (\n          <div\n            className={classnames('label', { selected: selected === i })}\n            amp-bind={`class=>${ampStateId}.${ampStateProperty} == \"tab${i}\" ? 'label selected' : 'label'`}\n          >\n            {label}\n          </div>\n        )\n      }\n\n      tabs.push(\n        <Tab\n          key={i}\n          label={label}\n          on={`tap:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: 'tab${i}' }})`}\n          classes={{\n            root: classnames({ [classes.ampTab]: amp }),\n            labelContainer: classnames({ [classes.ampTabLabelContainer]: amp })\n          }}\n        />\n      )\n\n      panels.push(\n        <div\n          key={i}\n          role=\"tabpanel\"\n          option={`tab${i}`}\n          selected={i === selected}\n          className={classnames(classes.panel, {\n            [classes.hidden]: !amp && i !== selected,\n            [classes.ampPanel]: amp\n          })}\n        >\n          {React.cloneElement(child, { label: null })}\n        </div>\n      )\n    })\n\n    if (amp) {\n      panels = (\n        <amp-selector\n          role=\"tablist\"\n          amp-bind={`selected=>${ampStateId}.${ampStateProperty}`}\n          class={classes.ampSelector}\n        >\n          {panels}\n        </amp-selector>\n      )\n    }\n\n    return (\n      <div className={classes.root}>\n        {amp && (\n          <Helmet>\n            <script\n              async\n              custom-element=\"amp-selector\"\n              src=\"https://cdn.ampproject.org/v0/amp-selector-0.1.js\"\n            />\n            <script\n              async\n              custom-element=\"amp-bind\"\n              src=\"https://cdn.ampproject.org/v0/amp-bind-0.1.js\"\n            />\n          </Helmet>\n        )}\n        <Tabs\n          variant={scrollable ? 'scrollable' : null}\n          value={selected}\n          onChange={this.onChange}\n          classes={{\n            indicator: classnames({ [classes.ampTabIndicator]: amp })\n          }}\n        >\n          {tabs}\n        </Tabs>\n        {panels}\n      </div>\n    )\n  }\n\n  onChange = (event, selected) => {\n    const { onChange } = this.props\n\n    this.setState({ selected })\n    if (onChange) {\n      onChange(selected)\n    }\n  }\n}\n",
    description:
      'A simple tab panel that is AMP-compatible.  Tab names are pull from the label prop of the child elements.\nAny type of element can be a child.\n\nExample:\n\n <TabPanel>\n   <div label="Description">\n     Description here\n   </div>\n   <CmsSlot label="Instructions">\n     { instructionsFromCms }\n   </CmsSlot>\n </TabPanel>',
    displayName: 'TabPanel',
    methods: [
      {
        name: 'onChange',
        docblock: null,
        modifiers: [],
        params: [{ name: 'event', type: null }, { name: 'selected', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'scrollable',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to false to prevent the tabs from scrolling'
        }
      },
      {
        name: 'selected',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'Selected tab index',
          defaultValue: { value: '0', computed: false }
        }
      },
      {
        name: 'onChange',
        props: { type: { name: 'func' }, required: false, description: 'On change callback' }
      },
      {
        name: 'ampStateId',
        props: { defaultValue: { value: "'moovAmpState'", computed: false }, required: false }
      },
      {
        name: 'ampStateProperty',
        props: { defaultValue: { value: "'selectedTab'", computed: false }, required: false }
      },
      {
        name: 'variant',
        props: { defaultValue: { value: "'scrollable'", computed: false }, required: false }
      }
    ],
    styles: {
      classes: [
        'root',
        'panel',
        'hidden',
        'ampSelector',
        'ampPanel',
        'ampTab',
        'ampTabLabelContainer',
        'ampTabIndicator'
      ],
      name: 'RSFTabPanel'
    }
  },
  TabsRow: {
    id: 'TabsRow',
    filename: 'TabsRow',
    importPath: 'TabsRow',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport classnames from 'classnames'\nimport Image from './Image'\nimport React, { Component, Fragment } from 'react'\nimport PropTypes from 'prop-types'\nimport { PropTypes as MobxPropTypes, inject, observer } from 'mobx-react'\nimport Tabs from '@material-ui/core/Tabs'\nimport Tab from '@material-ui/core/Tab'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport Link from './Link'\n\nexport const styles = theme => ({\n  indicator: {\n    height: '3px',\n    transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'\n  },\n  noSelection: {\n    visibility: 'hidden'\n  },\n  root: {\n    '& a': {\n      textDecoration: 'none',\n      color: 'inherit'\n    }\n  },\n  tab: {\n    fontWeight: 300,\n    height: '100%',\n    minWidth: '20px',\n    position: 'relative'\n  },\n  selectedTab: {\n    fontWeight: 500,\n    opacity: 1\n  },\n  scroller: {\n    '&::-webkit-scrollbar': {\n      display: 'none'\n    }\n  },\n  link: {\n    display: 'block',\n    height: '100%',\n    fontSize: theme.typography.body1.fontSize\n  },\n  centered: {\n    '&::before,&::after': {\n      display: 'block',\n      content: \"''\",\n      flex: 1\n    }\n  }\n})\n\n/**\n * A set of tabs.  Tabs are built from an array of model instances provided via the `items` prop.\n */\n@withStyles(styles, { name: 'RSFTabsRow' })\n@inject('app')\n@observer\nexport default class TabsRow extends Component {\n  static propTypes = {\n    /**\n     * Index of tab that should be selected by default\n     */\n    initialSelectedIdx: PropTypes.number,\n\n    /**\n     * Overridable classes object to allow customization of component\n     */\n    classes: PropTypes.objectOf(PropTypes.string),\n\n    /**\n     * Array of items that should be rendered\n     */\n    items: MobxPropTypes.arrayOrObservableArrayOf(\n      PropTypes.shape({\n        imageUrl: PropTypes.string,\n        alt: PropTypes.string,\n        text: PropTypes.string\n      })\n    ).isRequired,\n\n    /**\n     * Props for displayed images. See <Image /> component for details\n     */\n    imageProps: PropTypes.object,\n\n    /**\n     * Material-UI setting to control horizontal scrolling for tabs\n     */\n    scrollable: PropTypes.bool,\n\n    /**\n     * Callback function for tab change\n     */\n    onTabChange: PropTypes.func,\n\n    /**\n     * Set to true to center the tabs\n     */\n    centered: PropTypes.bool,\n\n    /**\n     * A function to override the default rendering of each tab's label.  The function is passed the MenuItem model\n     * corresponding to the item to be rendered.\n     */\n    tabRenderer: PropTypes.func\n  }\n\n  static defaultProps = {\n    items: [],\n    variant: 'scrollable',\n    centered: false\n  }\n\n  constructor(props) {\n    super(props)\n    this.state = {\n      selectedIdx: props.initialSelectedIdx\n    }\n  }\n\n  handleChange = (event, newValue) => {\n    this.setState(\n      {\n        selectedIdx: newValue\n      },\n      () => {\n        if (this.props.onTabChange) {\n          this.props.onTabChange(event, newValue)\n        }\n      }\n    )\n  }\n\n  componentWillReceiveProps(nextProps) {\n    if (nextProps.initialSelectedIdx !== this.initialSelectedIdx) {\n      this.setState({\n        selectedIdx: nextProps.initialSelectedIdx\n      })\n    }\n  }\n\n  render() {\n    const {\n      app,\n      tabRenderer,\n      centered,\n      items,\n      classes,\n      imageProps,\n      scrollable,\n      initialSelectedIdx,\n      onTabChange,\n      elevation,\n      ...tabsProps\n    } = this.props\n    const { selectedIdx } = this.state\n\n    return (\n      <Tabs\n        value={selectedIdx == null ? false : selectedIdx}\n        onChange={this.handleChange}\n        indicatorColor=\"secondary\"\n        variant={scrollable ? 'scrollable' : null}\n        className={classes.root}\n        classes={{\n          root: classes.root,\n          indicator: classnames(classes.indicator, { [classes.noSelection]: selectedIdx == null }),\n          flexContainer: classnames({ [classes.centered]: centered }),\n          scroller: classes.scroller\n        }}\n        {...tabsProps}\n      >\n        {items.map((item, i) => {\n          let icon\n          if (item.imageUrl) {\n            icon = <Image src={item.imageUrl} alt={item.alt} {...imageProps} />\n\n            if (app.amp && item.url) {\n              icon = <Link to={item.url}>{icon}</Link>\n            }\n          }\n\n          if (tabRenderer) {\n            const itemWithClasses = {\n              ...item,\n              classes: {\n                root: classes.tab\n              }\n            }\n            return tabRenderer(itemWithClasses, i)\n          } else {\n            return (\n              <Tab\n                key={i}\n                label={this.renderLabel(item)}\n                icon={icon}\n                classes={{\n                  root: classes.tab,\n                  selected: classes.selectedTab\n                }}\n              />\n            )\n          }\n        })}\n      </Tabs>\n    )\n  }\n\n  renderLabel = item => {\n    const { classes } = this.props\n\n    return item.url ? (\n      <Link\n        className={classes.link}\n        to={item.url}\n        prefetch={item.prefetch}\n        onClick={this.onLinkClick}\n      >\n        {item.text}\n      </Link>\n    ) : (\n      item.text\n    )\n  }\n\n  onLinkClick = e => {\n    e.preventDefault()\n  }\n}\n",
    description:
      'A set of tabs.  Tabs are built from an array of model instances provided via the `items` prop.',
    displayName: 'TabsRow',
    methods: [
      {
        name: 'handleChange',
        docblock: null,
        modifiers: [],
        params: [{ name: 'event', type: null }, { name: 'newValue', type: null }],
        returns: null
      },
      {
        name: 'renderLabel',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }],
        returns: null
      },
      {
        name: 'onLinkClick',
        docblock: null,
        modifiers: [],
        params: [{ name: 'e', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'initialSelectedIdx',
        props: {
          type: { name: 'number' },
          required: false,
          description: 'Index of tab that should be selected by default'
        }
      },
      {
        name: 'classes',
        props: {
          type: { name: 'objectOf', value: { name: 'string' } },
          required: false,
          description: 'Overridable classes object to allow customization of component'
        }
      },
      {
        name: 'items',
        props: {
          type: {
            name: 'custom',
            raw:
              'MobxPropTypes.arrayOrObservableArrayOf(\n  PropTypes.shape({\n    imageUrl: PropTypes.string,\n    alt: PropTypes.string,\n    text: PropTypes.string\n  })\n).isRequired'
          },
          required: false,
          description: 'Array of items that should be rendered',
          defaultValue: { value: '[]', computed: false }
        }
      },
      {
        name: 'imageProps',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Props for displayed images. See <Image /> component for details'
        }
      },
      {
        name: 'scrollable',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Material-UI setting to control horizontal scrolling for tabs'
        }
      },
      {
        name: 'onTabChange',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'Callback function for tab change'
        }
      },
      {
        name: 'centered',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to center the tabs',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'tabRenderer',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            "A function to override the default rendering of each tab's label.  The function is passed the MenuItem model\ncorresponding to the item to be rendered."
        }
      },
      {
        name: 'variant',
        props: { defaultValue: { value: "'scrollable'", computed: false }, required: false }
      }
    ],
    styles: {
      classes: [
        'indicator',
        'noSelection',
        'root',
        'tab',
        'selectedTab',
        'scroller',
        'link',
        'centered'
      ],
      name: 'RSFTabsRow'
    }
  },
  ToolbarButton: {
    id: 'ToolbarButton',
    filename: 'ToolbarButton',
    importPath: 'ToolbarButton',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport IconButton from '@material-ui/core/IconButton'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  wrap: {\n    display: 'flex',\n    flexDirection: 'column',\n    justifyContent: 'center',\n    alignItems: 'center',\n    ...theme.typography.caption\n  }\n})\n\n/**\n * A toolbar button with optional label.  Use these in your AppBar. All additional\n * props are spread to the underlying material-ui IconButton.\n */\n@withStyles(styles, { name: 'RSFToolbarButton' })\nexport default class ToolbarButton extends Component {\n  static propTypes = {\n    /**\n     * The icon\n     */\n    icon: PropTypes.element.isRequired,\n\n    /**\n     * The label text (optional)\n     */\n    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])\n  }\n\n  render() {\n    const { icon, label, classes, children, ...others } = this.props\n    const { wrap, ...buttonClasses } = classes\n\n    return (\n      <IconButton classes={buttonClasses} {...others}>\n        <div className={wrap}>\n          {icon}\n          <div>{label}</div>\n        </div>\n        {children}\n      </IconButton>\n    )\n  }\n}\n",
    description:
      'A toolbar button with optional label.  Use these in your AppBar. All additional\nprops are spread to the underlying material-ui IconButton.',
    displayName: 'ToolbarButton',
    methods: [],
    props: [
      {
        name: 'icon',
        props: { type: { name: 'element' }, required: true, description: 'The icon' }
      },
      {
        name: 'label',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'The label text (optional)'
        }
      }
    ],
    styles: { classes: ['wrap'], name: 'RSFToolbarButton' }
  },
  Track: {
    id: 'Track',
    filename: 'Track',
    importPath: 'Track',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { inject } from 'mobx-react'\nimport PropTypes from 'prop-types'\nimport escape from 'lodash/escape'\nimport analytics, { getTargets } from './analytics'\n\nlet nextId = 0\nlet ampAnalyticsTypes = {}\n\n/**\n * @private\n * Used to reset the id for repeatable test results.\n */\nexport function resetId() {\n  nextId = 0\n}\n\n/**\n * Fires an analytics event when the user interacts with the child component.  By default this fires when the user\n * clicks on the child component, but this can be overriden using the `trigger` prop.  The value of trigger should\n * be the name of the event prop to bind to. All additional props will be passed as options along with the event.\n *\n * Example:\n *\n * <Track event=\"addedToCart\" product={this.props.product}>\n *  <Button>Add to Cart</Button>\n * </Track>\n */\n@inject('app')\nexport default class Track extends Component {\n  constructor() {\n    super()\n    this.id = (nextId++).toString()\n  }\n\n  static propTypes = {\n    /**\n     * The name of the method to call on all configured analytics targets.\n     * For example, \"addedToCart\".\n     */\n    event: PropTypes.string,\n\n    /**\n     * The name of the handler prop on child component to intercept.  Defaults to \"onClick\"\n     */\n    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),\n\n    /**\n     * A function to call once the event has been successfully sent by all analytics targets.\n     */\n    onSuccess: PropTypes.func,\n\n    /**\n     * Additional data to send when tracking events in AMP.\n     */\n    ampData: PropTypes.object\n  }\n\n  static defaultProps = {\n    trigger: 'onClick',\n    onSuccess: Function.prototype,\n    ampData: {}\n  }\n\n  componentWillMount() {\n    if (this.props.app.amp) {\n      const { event, trigger, app, children, onSuccess, ...data } = this.props\n      this.createAmpTriggers(data)\n    }\n  }\n\n  render() {\n    return this.attachEvent()\n  }\n\n  /**\n   * Fires the analytics event asynchronously using setImmediate so as not to\n   * block the render loop.\n   * @param {String} e The event to fire\n   */\n  fireEvent(e) {\n    const { event, trigger, app, children, onSuccess, ampData, ...data } = this.props\n\n    setImmediate(async () => {\n      await analytics.fire(e, data)\n      onSuccess()\n    })\n  }\n\n  createTriggerHandler(el, trigger, event) {\n    let originalHandler = el.props[trigger]\n\n    return (...args) => {\n      if (originalHandler) originalHandler(...args)\n      this.fireEvent(event)\n    }\n  }\n\n  /**\n   * Intecepts the child's event handler prop corresponding to this.props.trigger\n   * and returns the cloned child.\n   * @return {React.Element}\n   */\n  attachEvent() {\n    let {\n      app: { amp },\n      children: el\n    } = this.props\n\n    if (el) {\n      const triggers = this.getTriggers()\n      const triggerHandlers = {}\n\n      for (let propName in triggers) {\n        triggerHandlers[propName] = this.createTriggerHandler(el, propName, triggers[propName])\n      }\n\n      const props = {\n        ...el.props,\n        ...triggerHandlers\n      }\n\n      if (amp) {\n        props['data-amp-id'] = this.id\n        props['data-vars-moov-test'] = 'foo'\n      }\n\n      return React.cloneElement(el, props)\n    } else {\n      return null\n    }\n  }\n\n  /**\n   * Returns the value of the trigger prop normalized to an object.  If trigger is a string,\n   * this function will return { [trigger]: event }\n   */\n  getTriggers() {\n    let { event, trigger } = this.props\n\n    if (typeof trigger === 'string') {\n      return { [trigger]: event }\n    } else {\n      return trigger\n    }\n  }\n\n  /**\n   * Creates AMP event trigger objects based on this.props.event\n   */\n  createAmpTriggers(data) {\n    const { event, children, ampData } = this.props\n\n    for (let target of getTargets()) {\n      const handler = target[event]\n      const type = target.getAmpAnalyticsType()\n\n      if (handler && type) {\n        let eventData\n\n        // Override send to capture the data that would be send instead of trying to send it\n        target.send = data => (eventData = data)\n\n        // Call the method corresponding to the event name, this should result in a call to send\n        handler.call(target, data)\n\n        if (eventData) {\n          if (!eventData.trigger && children) {\n            // no need to set a selector if we don't have a child element\n            // an example of this is pageview events\n            eventData.selector = `[data-amp-id=\"${this.id}\"]`\n          }\n\n          this.configureAmpEvent(type, {\n            on: eventData.selector ? 'click' : 'visible',\n            ...eventData,\n            request: 'event',\n            ...ampData\n          })\n        } else {\n          console.log(\n            `WARNING: No data will be sent for the ${event} event when running in AMP because ${\n              target.constructor.name\n            } didn't return any data for this event.`\n          )\n        }\n      }\n    }\n  }\n\n  /**\n   * Adds an AMP analytics event trigger\n   * @param {String} type An AMP analytics event type, e.g. googleanalytics\n   * @param {Object} trigger The trigger descriptor object\n   */\n  configureAmpEvent(type, trigger) {\n    let config = ampAnalyticsTypes[type]\n\n    if (!config) {\n      config = ampAnalyticsTypes[type] = {\n        triggers: []\n      }\n    }\n\n    config.triggers.push(trigger)\n  }\n}\n\nexport function renderAmpAnalyticsTags() {\n  const result = []\n\n  for (let type in ampAnalyticsTypes) {\n    const target = getTargets().find(t => t.getAmpAnalyticsType() === type)\n    const attributes =\n      target && target.getAmpAnalyticsAttributes ? target.getAmpAnalyticsAttributes() : { type }\n    const attributesHtml = Object.keys(attributes)\n      .map(key => `${key}=\"${escape(attributes[key])}\"`)\n      .join(' ')\n    result.push(\n      `<amp-analytics ${attributesHtml}>` +\n        `<script type=\"application/json\">${JSON.stringify(ampAnalyticsTypes[type])}</script>` +\n        `</amp-analytics>`\n    )\n  }\n\n  ampAnalyticsTypes = {}\n\n  return result.join('\\n')\n}\n",
    description:
      'Fires an analytics event when the user interacts with the child component.  By default this fires when the user\nclicks on the child component, but this can be overriden using the `trigger` prop.  The value of trigger should\nbe the name of the event prop to bind to. All additional props will be passed as options along with the event.\n\nExample:\n\n<Track event="addedToCart" product={this.props.product}>\n <Button>Add to Cart</Button>\n</Track>',
    displayName: 'Track',
    methods: [
      {
        name: 'fireEvent',
        docblock:
          'Fires the analytics event asynchronously using setImmediate so as not to\nblock the render loop.\n@param {String} e The event to fire',
        modifiers: [],
        params: [{ name: 'e', description: 'The event to fire', type: { name: 'String' } }],
        returns: null,
        description:
          'Fires the analytics event asynchronously using setImmediate so as not to\nblock the render loop.'
      },
      {
        name: 'createTriggerHandler',
        docblock: null,
        modifiers: [],
        params: [
          { name: 'el', type: null },
          { name: 'trigger', type: null },
          { name: 'event', type: null }
        ],
        returns: null
      },
      {
        name: 'attachEvent',
        docblock:
          "Intecepts the child's event handler prop corresponding to this.props.trigger\nand returns the cloned child.\n@return {React.Element}",
        modifiers: [],
        params: [],
        returns: { description: null, type: { name: 'React.Element' } },
        description:
          "Intecepts the child's event handler prop corresponding to this.props.trigger\nand returns the cloned child."
      },
      {
        name: 'getTriggers',
        docblock:
          'Returns the value of the trigger prop normalized to an object.  If trigger is a string,\nthis function will return { [trigger]: event }',
        modifiers: [],
        params: [],
        returns: null,
        description:
          'Returns the value of the trigger prop normalized to an object.  If trigger is a string,\nthis function will return { [trigger]: event }'
      },
      {
        name: 'createAmpTriggers',
        docblock: 'Creates AMP event trigger objects based on this.props.event',
        modifiers: [],
        params: [{ name: 'data' }],
        returns: null,
        description: 'Creates AMP event trigger objects based on this.props.event'
      },
      {
        name: 'configureAmpEvent',
        docblock:
          'Adds an AMP analytics event trigger\n@param {String} type An AMP analytics event type, e.g. googleanalytics\n@param {Object} trigger The trigger descriptor object',
        modifiers: [],
        params: [
          {
            name: 'type',
            description: 'An AMP analytics event type, e.g. googleanalytics',
            type: { name: 'String' }
          },
          {
            name: 'trigger',
            description: 'The trigger descriptor object',
            type: { name: 'Object' }
          }
        ],
        returns: null,
        description: 'Adds an AMP analytics event trigger'
      }
    ],
    props: [
      {
        name: 'event',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The name of the method to call on all configured analytics targets.\nFor example, "addedToCart".'
        }
      },
      {
        name: 'trigger',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'object' }] },
          required: false,
          description:
            'The name of the handler prop on child component to intercept.  Defaults to "onClick"',
          defaultValue: { value: "'onClick'", computed: false }
        }
      },
      {
        name: 'onSuccess',
        props: {
          type: { name: 'func' },
          required: false,
          description:
            'A function to call once the event has been successfully sent by all analytics targets.',
          defaultValue: { value: 'Function.prototype', computed: true }
        }
      },
      {
        name: 'ampData',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'Additional data to send when tracking events in AMP.',
          defaultValue: { value: '{}', computed: false }
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  UpdateNotification: {
    id: 'UpdateNotification',
    filename: 'UpdateNotification',
    importPath: 'UpdateNotification',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport Snackbar from '@material-ui/core/Snackbar'\nimport Button from '@material-ui/core/Button'\nimport IconButton from '@material-ui/core/IconButton'\nimport CloseIcon from '@material-ui/icons/Close'\n\n/**\n * A snackbar that automatically displays when a new version of the service worker is available.\n * By default the component only shows when the app is launched from the user's homescreen on android devices.\n * Additonal props are spread to the underlying material-ui Snackbar component\n */\nexport default class UpdateNotification extends Component {\n  state = {\n    notifyUpdate: false\n  }\n\n  static propTypes = {\n    /**\n     * The message to display\n     */\n    message: PropTypes.string,\n\n    /**\n     * The text for the reload button.\n     */\n    reloadButtonText: PropTypes.string\n  }\n\n  static defaultProps = {\n    message: 'An new version of this app is available.',\n    reloadButtonText: 'RELOAD'\n  }\n\n  render() {\n    const { message, reloadButtonText, ...others } = this.props\n    const { notifyUpdate } = this.state\n\n    return (\n      <Snackbar\n        open={notifyUpdate}\n        autoHideDuration={6000}\n        onClose={this.handleNotifyClose}\n        message={message}\n        action={[\n          <Button key=\"undo\" color=\"secondary\" size=\"small\" onClick={this.refresh}>\n            {reloadButtonText}\n          </Button>,\n          <IconButton\n            key=\"close\"\n            aria-label=\"Close\"\n            color=\"inherit\"\n            onClick={this.handleNotifyClose}\n          >\n            <CloseIcon />\n          </IconButton>\n        ]}\n        {...others}\n      />\n    )\n  }\n\n  componentDidMount() {\n    // published in registerServiceWorker.js\n    document.addEventListener('moov-update-available', () => {\n      console.log('new service worker installed')\n      this.setState({ notifyUpdate: true })\n    })\n  }\n\n  handleNotifyClose = () => {\n    this.setState({ notifyUpdate: false })\n  }\n\n  refresh = () => {\n    window.location.reload()\n  }\n}\n",
    description:
      "A snackbar that automatically displays when a new version of the service worker is available.\nBy default the component only shows when the app is launched from the user's homescreen on android devices.\nAdditonal props are spread to the underlying material-ui Snackbar component",
    displayName: 'UpdateNotification',
    methods: [
      { name: 'handleNotifyClose', docblock: null, modifiers: [], params: [], returns: null },
      { name: 'refresh', docblock: null, modifiers: [], params: [], returns: null }
    ],
    props: [
      {
        name: 'message',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The message to display',
          defaultValue: { value: "'An new version of this app is available.'", computed: false }
        }
      },
      {
        name: 'reloadButtonText',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The text for the reload button.',
          defaultValue: { value: "'RELOAD'", computed: false }
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  AmpExpandableSection: {
    id: 'AmpExpandableSection',
    filename: 'AmpExpandableSection',
    importPath: 'amp/AmpExpandableSection',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { Helmet } from 'react-helmet'\nimport Typography from '@material-ui/core/Typography'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport ExpandLess from '@material-ui/icons/ExpandLess'\nimport ExpandMore from '@material-ui/icons/ExpandMore'\nimport PropTypes from 'prop-types'\nimport classnames from 'classnames'\n\nexport const styles = theme => ({\n  accordion: {\n    borderBottom: `1px solid ${theme.palette.divider}`\n  },\n  title: {\n    backgroundColor: 'transparent',\n    padding: '12px 15px',\n    borderStyle: 'none',\n    outlineWidth: 0\n  },\n  section: {},\n  toggle: {\n    position: 'absolute',\n    right: '18px',\n    top: '13px'\n  },\n  expand: {\n    display: 'block',\n    'section[expanded] &': {\n      display: 'none'\n    }\n  },\n  collapse: {\n    display: 'none',\n    'section[expanded] &': {\n      display: 'block'\n    }\n  },\n  body: {\n    backgroundColor: 'transparent',\n    padding: `0 ${theme.margins.container}px`\n  }\n})\n\n/**\n * An AMP-compatible expandable section based on amp-accordion.\n */\n@withStyles(styles, { name: 'RSFAmpExpandableSection' })\nexport default class AmpExpandableSection extends Component {\n  static propTypes = {\n    /**\n     * The title for the header of the expandable section\n     */\n    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),\n\n    /**\n     * Set to true to expand the panel\n     */\n    expanded: PropTypes.bool,\n\n    /**\n     * The icon to use for collapsed groups\n     */\n    ExpandIcon: PropTypes.func,\n\n    /**\n     * The icon to use for expanded groups\n     */\n    CollapseIcon: PropTypes.func\n  }\n\n  static defaultProps = {\n    expanded: false,\n    ExpandIcon: ExpandMore,\n    CollapseIcon: ExpandLess\n  }\n\n  render() {\n    let { classes, expanded, children = [], title, ExpandIcon, CollapseIcon } = this.props\n\n    if (ExpandIcon === ExpandMore) {\n      CollapseIcon = ExpandLess\n    }\n\n    const sectionAttributes = {}\n\n    if (expanded) sectionAttributes.expanded = ''\n\n    return (\n      <Fragment>\n        <Helmet>\n          <script\n            async\n            custom-element=\"amp-accordion\"\n            src=\"https://cdn.ampproject.org/v0/amp-accordion-0.1.js\"\n          />\n        </Helmet>\n        <amp-accordion disable-session-states class={classes.accordion}>\n          <section className={classes.section} {...sectionAttributes}>\n            <Typography variant=\"subtitle1\" component=\"h3\" className={classes.title}>\n              {title}\n              <ExpandIcon className={classnames(classes.toggle, classes.expand)} />\n              <CollapseIcon className={classnames(classes.toggle, classes.collapse)} />\n            </Typography>\n            <div className={classes.body}>{children}</div>\n          </section>\n        </amp-accordion>\n      </Fragment>\n    )\n  }\n}\n",
    description: 'An AMP-compatible expandable section based on amp-accordion.',
    displayName: 'AmpExpandableSection',
    methods: [],
    props: [
      {
        name: 'title',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'element' }] },
          required: false,
          description: 'The title for the header of the expandable section'
        }
      },
      {
        name: 'expanded',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to expand the panel',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'ExpandIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'The icon to use for collapsed groups',
          defaultValue: { value: 'ExpandMore', computed: true }
        }
      },
      {
        name: 'CollapseIcon',
        props: {
          type: { name: 'func' },
          required: false,
          description: 'The icon to use for expanded groups',
          defaultValue: { value: 'ExpandLess', computed: true }
        }
      }
    ],
    styles: {
      classes: ['accordion', 'title', 'section', 'toggle', 'expand', 'collapse', 'body'],
      name: 'RSFAmpExpandableSection'
    }
  },
  AmpForm: {
    id: 'AmpForm',
    filename: 'AmpForm',
    importPath: 'amp/AmpForm',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { Helmet } from 'react-helmet'\nimport { inject } from 'mobx-react'\nimport LoadMask from '../LoadMask'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport { Provider } from 'mobx-react'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  mask: {\n    display: 'none',\n    '.amp-form-submitting &, .moov-amp-form-mask &': {\n      display: 'flex'\n    }\n  }\n})\n\n/**\n * An AMP-compatible form.  When not rendering AMP content, this component renders a simple div.\n * This component will automatically cover itself with a modal loading spinner when submitting.\n */\n@inject(({ app, nextId, ampStateId }) => ({ app, nextId, ampStateId }))\n@withStyles(styles, { name: 'RSFAmpForm' })\nexport default class AmpForm extends Component {\n  static propTypes = {\n    /**\n     * The id for the amp-form element.  If left blank a unique id will automatically be generated.\n     */\n    id: PropTypes.string,\n\n    /**\n     * The form's action attribute. Defaults to \"_top\".\n     */\n    target: PropTypes.string,\n\n    /**\n     * The HTTP method to use.  Defaults to \"get\".\n     */\n    method: PropTypes.oneOf(['get', 'post']),\n\n    /**\n     * Set to false to not show the mask when submitting.  Defaults to true.\n     */\n    mask: PropTypes.bool\n  }\n\n  static defaultProps = {\n    target: '_top',\n    method: 'get',\n    mask: true\n  }\n\n  constructor({ id, nextId }) {\n    super()\n    this.id = id || nextId()\n  }\n\n  render() {\n    let {\n      on,\n      ampStateId,\n      app,\n      mask,\n      classes,\n      method,\n      target,\n      id,\n      children,\n      action,\n      nextId,\n      ...others\n    } = this.props\n    let bind = others['amp-bind']\n    const validation = others['custom-validation-reporting']\n\n    if (app.amp) {\n      // add event handler for valid state to display the mask when submitting\n      // we do this because the submit event doesn't work when method=get\n      if (\n        method.toLowerCase() === 'get' &&\n        (validation == null || validation == 'show-first-on-submit')\n      ) {\n        on =\n          (on ? on + ',' : '') +\n          `valid:AMP.setState({ ${ampStateId}: { ___moov_submitting: true }})`\n        bind =\n          (on ? on + ',' : '') +\n          `class=>${ampStateId}.___moov_submitting ? 'moov-amp-form-mask' : null`\n      }\n\n      return (\n        <Provider ampFormId={this.id}>\n          <form\n            id={this.id}\n            data-id={this.id}\n            method={method}\n            target={target}\n            {...{\n              [method === 'post' ? 'action-xhr' : 'action']: action\n            }}\n            {...others}\n            on={on}\n            amp-bind={bind}\n          >\n            <Helmet>\n              <script\n                async\n                custom-element=\"amp-form\"\n                src=\"https://cdn.ampproject.org/v0/amp-form-0.1.js\"\n              />\n            </Helmet>\n\n            {mask && <LoadMask className={classes.mask} />}\n            {children}\n          </form>\n        </Provider>\n      )\n    } else {\n      return <div {...others}>{children}</div>\n    }\n  }\n}\n",
    description:
      'An AMP-compatible form.  When not rendering AMP content, this component renders a simple div.\nThis component will automatically cover itself with a modal loading spinner when submitting.',
    displayName: 'AmpForm',
    methods: [],
    props: [
      {
        name: 'id',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The id for the amp-form element.  If left blank a unique id will automatically be generated.'
        }
      },
      {
        name: 'target',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The form\'s action attribute. Defaults to "_top".',
          defaultValue: { value: "'_top'", computed: false }
        }
      },
      {
        name: 'method',
        props: {
          type: {
            name: 'enum',
            value: [{ value: "'get'", computed: false }, { value: "'post'", computed: false }]
          },
          required: false,
          description: 'The HTTP method to use.  Defaults to "get".',
          defaultValue: { value: "'get'", computed: false }
        }
      },
      {
        name: 'mask',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to false to not show the mask when submitting.  Defaults to true.',
          defaultValue: { value: 'true', computed: false }
        }
      }
    ],
    styles: { classes: ['mask'], name: 'RSFAmpForm' }
  },
  AmpHidden: {
    id: 'AmpHidden',
    filename: 'AmpHidden',
    importPath: 'amp/AmpHidden',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport PropTypes from 'prop-types'\nimport withStyles from '@material-ui/core/styles/withStyles'\n\nexport const styles = {\n  hidden: {\n    display: 'none'\n  }\n}\n\n/**\n * Renders an element that is hidden when a specific property in amp-state is set to true\n */\n@withStyles(styles, { name: 'RSFAmpHidden' })\nexport default class AmpHidden extends Component {\n  static propTypes = {\n    /**\n     * The type of component to use.  Defaults to div.\n     */\n    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),\n\n    /**\n     * The boolean amp-bind expression that will result in this component being hidden when true.\n     */\n    bind: PropTypes.string,\n\n    /**\n     * Set to true to hide the component on initial render\n     */\n    hidden: PropTypes.bool\n  }\n\n  static defaultProps = {\n    component: 'div',\n    hidden: false\n  }\n\n  render() {\n    const { classes, hidden, bind, component, ...others } = this.props\n\n    return React.createElement(component, {\n      'amp-bind': `class=>${bind} ? '${classes.hidden}' : null`,\n      className: hidden ? classes.hidden : null,\n      ...others\n    })\n  }\n}\n",
    description:
      'Renders an element that is hidden when a specific property in amp-state is set to true',
    displayName: 'AmpHidden',
    methods: [],
    props: [
      {
        name: 'component',
        props: {
          type: { name: 'union', value: [{ name: 'string' }, { name: 'func' }] },
          required: false,
          description: 'The type of component to use.  Defaults to div.',
          defaultValue: { value: "'div'", computed: false }
        }
      },
      {
        name: 'bind',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'The boolean amp-bind expression that will result in this component being hidden when true.'
        }
      },
      {
        name: 'hidden',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to hide the component on initial render',
          defaultValue: { value: 'false', computed: false }
        }
      }
    ],
    styles: { classes: ['hidden'], name: 'RSFAmpHidden' }
  },
  AmpImageSwitcher: {
    id: 'AmpImageSwitcher',
    filename: 'AmpImageSwitcher',
    importPath: 'amp/AmpImageSwitcher',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component } from 'react'\nimport { Helmet } from 'react-helmet'\nimport classnames from 'classnames'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport { inject } from 'mobx-react'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  root: {\n    height: '300px',\n    width: '450px',\n    position: 'relative',\n    '& > *': {\n      paddingBottom: 'none'\n    },\n    '& *[role=button]': {\n      borderRadius: '50%',\n      opacity: '0.5',\n      outline: 'none',\n      backgroundColor: 'rgba(0,0,0,0.3)'\n    }\n  },\n\n  // This fixes the issue where images do not show up sometimes when amp-carousel is placed in\n  // a div with display: flex.  See https://github.com/ampproject/amphtml/issues/14519\n  rootImportant: {\n    '&$root': {\n      display: 'block'\n    }\n  },\n\n  carouselWrap: {\n    height: 'calc(100% - 65px)',\n    position: 'relative'\n  },\n\n  thumbnails: {\n    marginTop: '10px',\n    whiteSpace: 'nowrap',\n    display: 'flex',\n    alignItems: 'stretch',\n    maxWidth: '100%',\n    overflowX: 'auto'\n  },\n\n  thumbnailsWrap: {\n    display: 'flex',\n    margin: 'auto',\n    justifyContent: 'flex-start'\n  },\n\n  thumbnail: {\n    height: '70px',\n    width: '50px',\n    position: 'relative',\n    margin: '0 2px',\n    border: 'none',\n    outline: 'none',\n    background: 'none',\n    opacity: 0.7,\n    '& img': {\n      objectFit: 'contain'\n    }\n  },\n\n  thumbnailSelected: {\n    opacity: 1\n  },\n\n  thumbnailSelectedLine: {\n    borderBottom: `3px solid ${theme.palette.secondary.main}`,\n    width: '50px',\n    margin: '0px 2px',\n    position: 'relative',\n    bottom: '4px'\n  },\n\n  dot: {},\n  dots: {},\n  dotSelected: {},\n\n  '@global': {\n    'amp-lightbox-gallery div[aria-label=\"Gallery\"]': {\n      display: 'none'\n    }\n  }\n})\n\n/**\n * An AMP-compatible image switcher with pinch and zoom.\n */\n@withStyles(styles, { name: 'RSFAmpImageSwitcher' })\n@inject('nextId', 'ampStateId')\nexport default class AmpImageSwitcher extends Component {\n  static propTypes = {\n    /**\n     * The amp-carousel type.  Can be \"slides\" or \"carousel\".  Defaults to \"slides\".\n     */\n    type: PropTypes.oneOf(['slides', 'carousel']),\n\n    /**\n     * Set to true to display dots indicated which image in the series is selected.  Defaults to false\n     */\n    indicators: PropTypes.bool,\n\n    /**\n     * The property in the amp state to bind to.  Defaults to \"selectedImage\"\n     */\n    ampStateProperty: PropTypes.string,\n\n    /**\n     * Set to true to display left and right arrows.  Defaults to false\n     */\n    arrows: PropTypes.bool\n  }\n\n  static defaultProps = {\n    type: 'slides',\n    indicators: false,\n    ampStateProperty: 'selectedImage',\n    controls: false\n  }\n\n  constructor({ id, nextId }) {\n    super()\n    id = id || nextId()\n    this.id = id || `moov-image-switcher-${id}`\n    this.ampStateId = `moovImageSwitcherState${id}`\n  }\n\n  render() {\n    let {\n      type,\n      arrows,\n      indicators,\n      ampStateId,\n      ampStateProperty,\n      images,\n      thumbnails,\n      classes,\n      className\n    } = this.props\n    const { id } = this\n\n    return (\n      <div className={classnames(className, classes.root, classes.rootImportant)}>\n        <Helmet>\n          <script\n            async\n            custom-element=\"amp-carousel\"\n            src=\"https://cdn.ampproject.org/v0/amp-carousel-0.1.js\"\n          />\n          <script\n            async\n            custom-element=\"amp-lightbox-gallery\"\n            src=\"https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js\"\n          />\n        </Helmet>\n        <div className={classes.carouselWrap}>\n          <amp-carousel\n            controls={arrows ? true : undefined}\n            id={id}\n            layout=\"fill\"\n            type={type}\n            amp-bind={`slide=>${ampStateId}.${ampStateProperty}`}\n            on={`slideChange:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: event.index } })`}\n          >\n            {images.map(({ src, alt }) => (\n              <amp-img key={src} lightbox src={src} layout=\"fill\" alt={alt} />\n            ))}\n          </amp-carousel>\n          {indicators && (\n            <div className={classes.dots}>\n              {images.map(({ src }, i) => (\n                <div\n                  key={src}\n                  amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${i} ? '${classes.dot} ${\n                    classes.dotSelected\n                  }' : '${classes.dot}'`}\n                  className={classnames(classes.dot, { [classes.dotSelected]: i === 0 })}\n                />\n              ))}\n            </div>\n          )}\n        </div>\n        {thumbnails && thumbnails.length > 0 && (\n          <div className={classes.thumbnails}>\n            <div className={classes.thumbnailsWrap}>\n              {thumbnails.map(({ src, alt }, i) => (\n                <button\n                  key={src}\n                  type=\"button\"\n                  on={`tap:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: ${i} }})`}\n                  className={classes.thumbnail}\n                >\n                  <amp-img\n                    src={src}\n                    alt={alt}\n                    layout=\"fill\"\n                    amp-bind={`class=>${ampStateId}.${ampStateProperty} == ${i} ? '${\n                      classes.thumbnail\n                    } ${classes.thumbnailSelected}' : '${classes.thumbnail}'`}\n                    class={classnames(classes.thumbnail, { [classes.thumbnailSelected]: i === 0 })}\n                  />\n                  {i === 0 && <div className={classes.thumbnailSelectedLine} />}\n                </button>\n              ))}\n            </div>\n          </div>\n        )}\n      </div>\n    )\n  }\n}\n",
    description: 'An AMP-compatible image switcher with pinch and zoom.',
    displayName: 'AmpImageSwitcher',
    methods: [],
    props: [
      {
        name: 'type',
        props: {
          type: {
            name: 'enum',
            value: [
              { value: "'slides'", computed: false },
              { value: "'carousel'", computed: false }
            ]
          },
          required: false,
          description:
            'The amp-carousel type.  Can be "slides" or "carousel".  Defaults to "slides".',
          defaultValue: { value: "'slides'", computed: false }
        }
      },
      {
        name: 'indicators',
        props: {
          type: { name: 'bool' },
          required: false,
          description:
            'Set to true to display dots indicated which image in the series is selected.  Defaults to false',
          defaultValue: { value: 'false', computed: false }
        }
      },
      {
        name: 'ampStateProperty',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The property in the amp state to bind to.  Defaults to "selectedImage"',
          defaultValue: { value: "'selectedImage'", computed: false }
        }
      },
      {
        name: 'arrows',
        props: {
          type: { name: 'bool' },
          required: false,
          description: 'Set to true to display left and right arrows.  Defaults to false'
        }
      },
      {
        name: 'controls',
        props: { defaultValue: { value: 'false', computed: false }, required: false }
      }
    ],
    styles: {
      classes: [
        'root',
        'rootImportant',
        'carouselWrap',
        'thumbnails',
        'thumbnailsWrap',
        'thumbnail',
        'thumbnailSelected',
        'thumbnailSelectedLine',
        'dot',
        'dots',
        'dotSelected',
        '@global'
      ],
      name: 'RSFAmpImageSwitcher'
    }
  },
  AmpMenu: {
    id: 'AmpMenu',
    filename: 'AmpMenu',
    importPath: 'amp/AmpMenu',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { inject } from 'mobx-react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport withTheme from '@material-ui/core/styles/withTheme'\nimport { Helmet } from 'react-helmet'\nimport MenuBody from '../menu/MenuBody'\nimport classnames from 'classnames'\n\nexport const styles = theme => ({\n  root: {\n    position: 'relative',\n    marginTop: theme.headerHeight,\n    height: `calc(100vh - ${theme.headerHeight}px)`,\n    borderTop: `1px solid ${theme.palette.divider}`,\n    backgroundColor: theme.palette.background.paper,\n    boxShadow: '10px 2px 10px -5px rgba(0, 0, 0, 0.2)',\n    paddingBottom: '64px',\n    '& h3': {\n      backgroundColor: theme.palette.background.paper\n    },\n    '& .expanded > .menu-item': {\n      color: theme.palette.secondary.contrastText,\n      backgroundColor: theme.palette.secondary.main,\n      borderColor: theme.palette.secondary.main,\n      '& svg': {\n        fill: theme.palette.secondary.contrastText\n      }\n    },\n    '& a': {\n      color: theme.typography.body1.color\n    },\n    '& ~ div[class*=\"amphtml-sidebar-mask\"]': {\n      background: 'rgba(0, 0, 0, 0.5)',\n      opacity: 1\n    }\n  }\n})\n\n/**\n * An AMP-compatible menu based on amp-sidebar.\n *\n * In addition to the CSS classes that can be overridden of menu subcomponents, you can also\n * assign specific classes to individual menu items by specifying a value for the `className`\n * field on any instance of `MenuItemModel`.\n */\n@withTheme()\n@withStyles(styles, { name: 'RSFAmpMenu' })\n@inject(({ app }) => ({ menu: app.menu }))\nexport default class AmpMenu extends Component {\n  static defaultProps = {\n    id: 'moov_menu'\n  }\n\n  render() {\n    const {\n      id,\n      menu,\n      classes,\n      theme,\n      className,\n      drawerWidth,\n      rootHeader,\n      rootFooter,\n      ExpandIcon,\n      CollapseIcon,\n      align\n    } = this.props\n\n    const root = menu.levels[0]\n\n    const bodies = [\n      <MenuBody\n        rootHeader={rootHeader}\n        rootFooter={rootFooter}\n        drawerWidth={drawerWidth}\n        ExpandIcon={ExpandIcon}\n        CollapseIcon={CollapseIcon}\n        root={root}\n        depth={0}\n        path={[]}\n        classes={classes}\n        theme={theme}\n        // Force expanders in AMP\n        useExpanders\n      />\n    ]\n\n    // Build first level menu screens\n    root.items.forEach((node, index) => {\n      if (node.items) {\n        bodies.push(\n          <MenuBody\n            rootHeader={rootHeader}\n            rootFooter={rootFooter}\n            drawerWidth={drawerWidth}\n            ExpandIcon={ExpandIcon}\n            CollapseIcon={CollapseIcon}\n            root={node}\n            depth={1}\n            path={[index]}\n            classes={classes}\n            theme={theme}\n            // Force expanders in AMP\n            useExpanders\n          />\n        )\n      }\n    })\n\n    return (\n      <Fragment>\n        <Helmet key=\"helmet\">\n          <script\n            async\n            custom-element=\"amp-sidebar\"\n            src=\"https://cdn.ampproject.org/v0/amp-sidebar-0.1.js\"\n          />\n          <script\n            async\n            custom-element=\"amp-bind\"\n            src=\"https://cdn.ampproject.org/v0/amp-bind-0.1.js\"\n          />\n          <style amp-custom>{`\n            #${id} {\n              width: ${drawerWidth}px;\n            }\n          `}</style>\n        </Helmet>\n        <amp-sidebar\n          key=\"sidebar\"\n          id={id}\n          class={classnames(className, classes.root)}\n          layout=\"nodisplay\"\n          side={align}\n          on=\"sidebarClose:AMP.setState({ menuOpen: false })\"\n        >\n          {bodies}\n        </amp-sidebar>\n      </Fragment>\n    )\n  }\n}\n",
    description:
      'An AMP-compatible menu based on amp-sidebar.\n\nIn addition to the CSS classes that can be overridden of menu subcomponents, you can also\nassign specific classes to individual menu items by specifying a value for the `className`\nfield on any instance of `MenuItemModel`.',
    displayName: 'AmpMenu',
    methods: [],
    props: [
      {
        name: 'id',
        props: { defaultValue: { value: "'moov_menu'", computed: false }, required: false }
      }
    ],
    styles: { classes: ['root'], name: 'RSFAmpMenu' }
  },
  AmpModal: {
    id: 'AmpModal',
    filename: 'AmpModal',
    importPath: 'amp/AmpModal',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { Helmet } from 'react-helmet'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport PropTypes from 'prop-types'\n\nexport const styles = theme => ({\n  root: {\n    zIndex: theme.zIndex.amp.modal + 2, // zIndex of AppBar's withAmp + 1\n    backgroundColor: 'rgba(255, 255, 255, .8)'\n  }\n})\n\n/**\n * An AMP-compatible modal based on `<amp-lightbox>`\n *\n * All props not specifically documented here are spread to the `<amp-lightbox>` element.\n * More info about amp-lightbox on AMP docs: https://www.ampproject.org/docs/reference/components/amp-lightbox\n *\n * Usage example:\n *\n *  <button on=\"tap:modal\">Open Modal</button>\n *\n *  <AmpModal id=\"modal\">\n *    <button on=\"tap:modal.close\">Close Modal</button>\n *    <div>Modal content ...</div>\n *  </AmpModal>\n */\n@withStyles(styles, { name: 'RSFAmpModal' })\nexport default class AmpModal extends Component {\n  static propTypes = {\n    /**\n     * The id for the amp-lightbox element.\n     * This is REQUIRED attribute.\n     */\n    id: PropTypes.string,\n\n    /**\n     * Defines the style of animation for opening the lightbox.\n     * By default, this will be set to `fade-in`.\n     * Valid values are `fade-in`, `fly-in-bottom` and `fly-in-top`.\n     *\n     * Note: The `fly-in-*` animation presets modify the transform property of the amp-lightbox element.\n     * Do not rely on transforming the amp-lightbox element directly.\n     * If you need to apply a transform, set it on a nested element instead.\n     */\n    animateIn: PropTypes.string\n  }\n\n  static defaultProps = {\n    animateIn: 'fade-in'\n  }\n\n  render() {\n    let { id, animateIn, classes, children, ...others } = this.props\n\n    if (!id) {\n      return new Error('Prop `id` is required for `AmpModal` component')\n    }\n\n    return (\n      <Fragment>\n        <Helmet key=\"helmet\">\n          <script\n            async\n            custom-element=\"amp-lightbox\"\n            src=\"https://cdn.ampproject.org/v0/amp-lightbox-0.1.js\"\n          />\n        </Helmet>\n        <amp-lightbox\n          key=\"lightbox\"\n          layout=\"nodisplay\"\n          id={id}\n          animate-in={animateIn}\n          class={classes.root}\n          {...others}\n        >\n          {children}\n        </amp-lightbox>\n      </Fragment>\n    )\n  }\n}\n",
    description:
      'An AMP-compatible modal based on `<amp-lightbox>`\n\nAll props not specifically documented here are spread to the `<amp-lightbox>` element.\nMore info about amp-lightbox on AMP docs: https://www.ampproject.org/docs/reference/components/amp-lightbox\n\nUsage example:\n\n <button on="tap:modal">Open Modal</button>\n\n <AmpModal id="modal">\n   <button on="tap:modal.close">Close Modal</button>\n   <div>Modal content ...</div>\n </AmpModal>',
    displayName: 'AmpModal',
    methods: [],
    props: [
      {
        name: 'id',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'The id for the amp-lightbox element.\nThis is REQUIRED attribute.'
        }
      },
      {
        name: 'animateIn',
        props: {
          type: { name: 'string' },
          required: false,
          description:
            'Defines the style of animation for opening the lightbox.\nBy default, this will be set to `fade-in`.\nValid values are `fade-in`, `fly-in-bottom` and `fly-in-top`.\n\nNote: The `fly-in-*` animation presets modify the transform property of the amp-lightbox element.\nDo not rely on transforming the amp-lightbox element directly.\nIf you need to apply a transform, set it on a nested element instead.',
          defaultValue: { value: "'fade-in'", computed: false }
        }
      }
    ],
    styles: { classes: ['root'], name: 'RSFAmpModal' }
  },
  AmpSimpleMenu: {
    id: 'AmpSimpleMenu',
    filename: 'AmpSimpleMenu',
    importPath: 'amp/AmpSimpleMenu',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { inject } from 'mobx-react'\nimport withStyles from '@material-ui/core/styles/withStyles'\nimport withTheme from '@material-ui/core/styles/withTheme'\nimport { Helmet } from 'react-helmet'\nimport Link from '../Link'\nimport Typography from '@material-ui/core/Typography'\nimport classnames from 'classnames'\nimport ExpandMoreIcon from '@material-ui/icons/ExpandMore'\nimport ExpandLessIcon from '@material-ui/icons/ExpandLess'\nimport ListItemText from '@material-ui/core/ListItemText'\n\nexport const styles = theme => ({\n  root: {\n    position: 'relative',\n    marginTop: theme.headerHeight,\n    height: `calc(100vh - ${theme.headerHeight}px)`,\n    borderTop: `1px solid ${theme.palette.divider}`,\n    backgroundColor: theme.palette.background.paper,\n    boxShadow: '10px 2px 10px -5px rgba(0, 0, 0, 0.2)',\n    paddingBottom: '64px',\n    '& h3': {\n      backgroundColor: theme.palette.background.paper\n    },\n    '& section[expanded] > h3': {\n      color: theme.palette.secondary.contrastText,\n      backgroundColor: theme.palette.secondary.main,\n      borderColor: theme.palette.secondary.main\n    },\n    '& a': {\n      color: theme.typography.body1.color\n    },\n    '& ~ div[class*=\"amphtml-sidebar-mask\"]': {\n      background: 'rgba(0, 0, 0, 0.5)',\n      opacity: 1\n    }\n  },\n  item: {\n    padding: '12px 16px',\n    borderColor: theme.palette.divider,\n    borderWidth: '0 0 1px 0',\n    borderStyle: 'solid',\n    display: 'block',\n    textDecoration: 'none'\n  },\n  group: {\n    textTransform: 'uppercase'\n  },\n  toggle: {\n    position: 'absolute',\n    right: '18px',\n    top: '12px'\n  },\n  expand: {\n    display: 'block',\n    'section[expanded] > h3 > &': {\n      display: 'none'\n    }\n  },\n  collapse: {\n    display: 'none',\n    'section[expanded] > h3 > &': {\n      display: 'block'\n    }\n  }\n})\n\n/**\n * An AMP-compatible menu based on amp-sidebar.\n *\n * In addition to the CSS classes that can be overridden of menu subcomponents, you can also\n * assign specific classes to individual menu items by specifying a value for the `className`\n * field on any instance of `MenuItemModel`.\n */\n@withTheme()\n@withStyles(styles, { name: 'RSFAmpSimpleMenu' })\n@inject(({ app }) => ({ menu: app.menu }))\nexport default class AmpSimpleMenu extends Component {\n  static defaultProps = {\n    id: 'moov_menu'\n  }\n\n  render() {\n    const { id, menu, classes, className, drawerWidth, rootHeader, rootFooter, align } = this.props\n    const root = menu.levels.length ? menu.levels[0] : null\n\n    return (\n      <Fragment>\n        <Helmet key=\"helmet\">\n          <script\n            async\n            custom-element=\"amp-sidebar\"\n            src=\"https://cdn.ampproject.org/v0/amp-sidebar-0.1.js\"\n          />\n          <script\n            async\n            custom-element=\"amp-accordion\"\n            src=\"https://cdn.ampproject.org/v0/amp-accordion-0.1.js\"\n          />\n          <script\n            async\n            custom-element=\"amp-bind\"\n            src=\"https://cdn.ampproject.org/v0/amp-bind-0.1.js\"\n          />\n          <style amp-custom>{`\n            #${id} {\n              width: ${drawerWidth}px;\n            }\n          `}</style>\n        </Helmet>\n        <amp-sidebar\n          key=\"sidebar\"\n          id={id}\n          class={classnames(className, classes.root)}\n          layout=\"nodisplay\"\n          side={align}\n          on=\"sidebarClose:AMP.setState({ menuOpen: false })\"\n        >\n          {rootHeader}\n          {this.renderItem(root)}\n          {rootFooter}\n        </amp-sidebar>\n      </Fragment>\n    )\n  }\n\n  renderItem(item, key) {\n    if (item == null) {\n      return null\n    } else if (item.items) {\n      return this.renderGroup(item, key)\n    } else {\n      return this.renderLeaf(item, key)\n    }\n  }\n\n  renderGroup(item, key) {\n    let { classes, ExpandIcon, CollapseIcon, theme } = this.props\n\n    ExpandIcon = ExpandIcon || theme.ExpandIcon || ExpandMoreIcon\n    CollapseIcon = CollapseIcon || theme.CollapseIcon || ExpandLessIcon\n\n    const section = (\n      <section key={key}>\n        {item.text && (\n          <Typography\n            variant=\"body1\"\n            component=\"h3\"\n            className={classnames(classes.item, classes.group, item.className)}\n          >\n            {item.text}\n            <CollapseIcon className={classnames(classes.toggle, classes.collapse)} />\n            <ExpandIcon className={classnames(classes.toggle, classes.expand)} />\n          </Typography>\n        )}\n        <div>{item.items.map((item, i) => this.renderItem(item, i))}</div>\n      </section>\n    )\n\n    if (item.root) {\n      return section\n    } else {\n      return (\n        <amp-accordion key={key} disable-session-states>\n          {section}\n        </amp-accordion>\n      )\n    }\n  }\n\n  renderLeaf(item, key) {\n    return (\n      <Link key={key} className={classnames(this.props.classes.item, item.className)} to={item.url}>\n        <ListItemText>{item.text}</ListItemText>\n      </Link>\n    )\n  }\n}\n",
    description:
      'An AMP-compatible menu based on amp-sidebar.\n\nIn addition to the CSS classes that can be overridden of menu subcomponents, you can also\nassign specific classes to individual menu items by specifying a value for the `className`\nfield on any instance of `MenuItemModel`.',
    displayName: 'AmpSimpleMenu',
    methods: [
      {
        name: 'renderItem',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }, { name: 'key', type: null }],
        returns: null
      },
      {
        name: 'renderGroup',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }, { name: 'key', type: null }],
        returns: null
      },
      {
        name: 'renderLeaf',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }, { name: 'key', type: null }],
        returns: null
      }
    ],
    props: [
      {
        name: 'id',
        props: { defaultValue: { value: "'moov_menu'", computed: false }, required: false }
      }
    ],
    styles: {
      classes: ['root', 'item', 'group', 'toggle', 'expand', 'collapse'],
      name: 'RSFAmpSimpleMenu'
    }
  },
  AmpState: {
    id: 'AmpState',
    filename: 'AmpState',
    importPath: 'amp/AmpState',
    src:
      "/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { PropTypes } from 'prop-types'\nimport { Provider, inject } from 'mobx-react'\nimport { Helmet } from 'react-helmet'\n\n/**\n * A container that initialize amp state to be consumed by child components.  Components that support AMP functionality\n * like QuantitySelector and TapPanel must be inside an AmpState element.\n */\n@inject(({ app }) => ({ amp: app.amp }))\nexport default class AmpState extends Component {\n  static propTypes = {\n    /**\n     * The initial values for the amp-state.  Defaults to `{}`\n     */\n    initialState: PropTypes.object,\n\n    /**\n     * An id for the root amp state object. Defaults to \"moovAmpState\".\n     */\n    id: PropTypes.string\n  }\n\n  static defaultProps = {\n    initialState: {},\n    id: 'moovAmpState'\n  }\n\n  render() {\n    const { id, amp, initialState, children } = this.props\n\n    return (\n      <Provider ampStateId={id}>\n        {amp ? (\n          <Fragment>\n            <Helmet>\n              <script\n                async\n                custom-element=\"amp-bind\"\n                src=\"https://cdn.ampproject.org/v0/amp-bind-0.1.js\"\n              />\n            </Helmet>\n            <amp-state id={id}>\n              <script\n                type=\"application/json\"\n                dangerouslySetInnerHTML={{\n                  __html: JSON.stringify(initialState.toJSON ? initialState.toJSON() : initialState)\n                }}\n              />\n            </amp-state>\n            {children}\n          </Fragment>\n        ) : (\n          <Fragment>{children}</Fragment>\n        )}\n      </Provider>\n    )\n  }\n}\n",
    description:
      'A container that initialize amp state to be consumed by child components.  Components that support AMP functionality\nlike QuantitySelector and TapPanel must be inside an AmpState element.',
    displayName: 'AmpState',
    methods: [],
    props: [
      {
        name: 'initialState',
        props: {
          type: { name: 'object' },
          required: false,
          description: 'The initial values for the amp-state.  Defaults to `{}`',
          defaultValue: { value: '{}', computed: false }
        }
      },
      {
        name: 'id',
        props: {
          type: { name: 'string' },
          required: false,
          description: 'An id for the root amp state object. Defaults to "moovAmpState".',
          defaultValue: { value: "'moovAmpState'", computed: false }
        }
      }
    ],
    styles: { classes: [], name: null }
  },
  OpenWithLabel: {
    id: 'OpenWithLabel',
    filename: 'OpenWithLabel',
    importPath: 'icons/OpenWithLabel',
    src:
      '/**\n * @license\n * Copyright © 2017-2018 Moov Corporation.  All rights reserved.\n */\nimport React from \'react\'\n\nexport default function OpenWithLabel() {\n  return (\n    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 31.7 31.7">\n      <path\n        id="Shape"\n        d="M0.9,17.7h29.8v-2.8H0.9V17.7L0.9,17.7z M0.9,10.8h29.8V8.1H0.9V10.8L0.9,10.8z M0.9,1.2v2.8h29.8V1.2H0.9\n        L0.9,1.2z"\n      />\n      <path\n        id="menu"\n        d="M0.4,24h1.1v1h0c0-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.3-0.3,0.4-0.4c0.2-0.1,0.4-0.2,0.6-0.3s0.5-0.1,0.8-0.1\n        c0.5,0,0.9,0.1,1.2,0.3c0.3,0.2,0.6,0.5,0.8,0.9c0.2-0.4,0.5-0.7,0.9-0.9s0.7-0.3,1.1-0.3c0.5,0,0.9,0.1,1.2,0.2\n        c0.3,0.2,0.6,0.4,0.7,0.6c0.2,0.3,0.3,0.6,0.4,0.9c0.1,0.3,0.1,0.7,0.1,1v3.7H8.7v-3.5c0-0.2,0-0.5,0-0.7c0-0.2-0.1-0.4-0.2-0.6\n        c-0.1-0.2-0.2-0.3-0.4-0.4S7.6,25,7.3,25c-0.6,0-1,0.2-1.2,0.5s-0.4,0.8-0.4,1.4v3.4H4.5v-3.3c0-0.3,0-0.6,0-0.8\n        c0-0.2-0.1-0.5-0.2-0.6c-0.1-0.2-0.2-0.3-0.4-0.4C3.7,25.1,3.5,25,3.2,25c-0.2,0-0.4,0-0.6,0.1c-0.2,0.1-0.4,0.2-0.5,0.4\n        c-0.2,0.2-0.3,0.4-0.4,0.6c-0.1,0.3-0.1,0.6-0.1,0.9v3.3H0.4V24z M12.3,27.6c0,0.3,0.1,0.5,0.2,0.8c0.1,0.2,0.3,0.4,0.5,0.6\n        c0.2,0.2,0.4,0.3,0.7,0.4c0.3,0.1,0.5,0.1,0.8,0.1c0.4,0,0.7-0.1,1-0.3s0.5-0.4,0.8-0.7l0.9,0.7c-0.7,0.9-1.6,1.3-2.8,1.3\n        c-0.5,0-0.9-0.1-1.3-0.3c-0.4-0.2-0.7-0.4-1-0.7c-0.3-0.3-0.5-0.6-0.6-1c-0.2-0.4-0.2-0.8-0.2-1.3c0-0.5,0.1-0.9,0.2-1.3\n        c0.2-0.4,0.4-0.8,0.7-1c0.3-0.3,0.6-0.5,1-0.7c0.4-0.2,0.8-0.3,1.3-0.3c0.6,0,1,0.1,1.4,0.3c0.4,0.2,0.7,0.4,1,0.8\n        c0.2,0.3,0.4,0.7,0.5,1.1c0.1,0.4,0.2,0.8,0.2,1.2v0.4H12.3z M16.1,26.7c0-0.3-0.1-0.5-0.1-0.7c-0.1-0.2-0.2-0.4-0.3-0.6\n        c-0.2-0.2-0.3-0.3-0.6-0.4c-0.2-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.6,0.1-0.8,0.2c-0.2,0.1-0.4,0.3-0.6,0.4s-0.3,0.4-0.4,0.6\n        c-0.1,0.2-0.1,0.4-0.1,0.6H16.1z M18.6,24h1.2v1h0c0.2-0.3,0.4-0.6,0.8-0.8c0.4-0.2,0.8-0.3,1.3-0.3c0.3,0,0.6,0,0.9,0.1\n        c0.3,0.1,0.5,0.2,0.7,0.4c0.2,0.2,0.4,0.4,0.5,0.8c0.1,0.3,0.2,0.7,0.2,1.1v4.1H23v-3.7c0-0.3,0-0.5-0.1-0.8\n        c-0.1-0.2-0.2-0.4-0.3-0.5c-0.1-0.1-0.3-0.2-0.5-0.3C21.9,25,21.7,25,21.5,25c-0.2,0-0.5,0-0.7,0.1c-0.2,0.1-0.4,0.2-0.6,0.4\n        s-0.3,0.4-0.4,0.7c-0.1,0.3-0.1,0.6-0.1,0.9v3.2h-1.2V24z M31.3,30.3h-1.2v-1h0c-0.2,0.3-0.4,0.6-0.8,0.8c-0.4,0.2-0.8,0.3-1.3,0.3\n        c-0.3,0-0.6,0-0.9-0.1c-0.3-0.1-0.5-0.2-0.7-0.4c-0.2-0.2-0.4-0.4-0.5-0.8c-0.1-0.3-0.2-0.7-0.2-1.1V24h1.2v3.7c0,0.3,0,0.5,0.1,0.8\n        c0.1,0.2,0.2,0.4,0.3,0.5c0.1,0.1,0.3,0.2,0.5,0.3s0.4,0.1,0.5,0.1c0.2,0,0.5,0,0.7-0.1c0.2-0.1,0.4-0.2,0.6-0.4\n        c0.2-0.2,0.3-0.4,0.4-0.7s0.1-0.6,0.1-0.9V24h1.2V30.3z"\n      />\n    </svg>\n  )\n}\n',
    description: '',
    displayName: 'OpenWithLabel',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  Body: {
    id: 'Body',
    filename: 'Body',
    importPath: 'menu/Body',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport ListItemText from '@material-ui/core/ListItemText'\nimport MenuList from '@material-ui/core/MenuList'\nimport MenuItem from '@material-ui/core/MenuItem'\nimport ChevronLeft from '@material-ui/icons/ChevronLeft'\nimport ListItemIcon from '@material-ui/core/ListItemIcon'\nimport Item from './Item'\nimport MenuContext from './MenuContext'\n\n@inject('app')\n@observer\nexport default class Body extends Component {\n  static contextType = MenuContext\n\n  render() {\n    const {\n      rootHeader,\n      rootFooter,\n      simple,\n      drawerWidth,\n      children,\n      app: { menu }\n    } = this.props\n\n    const { levels, level } = menu\n    const position = -drawerWidth * level\n    const { classes } = this.context\n\n    return (\n      <Fragment>\n        {children}\n        {simple ? (\n          this.renderSimple()\n        ) : (\n          <div className={classes.hbox} style={{ transform: `translateX(${position}px)`, flex: 1 }}>\n            {levels.map((list, depth) => (\n              <MenuList\n                style={{ width: `${drawerWidth}px` }}\n                classes={{ root: classes.list, padding: classes.padding }}\n                key={depth}\n              >\n                {list.root && rootHeader}\n                {!list.root && (\n                  <MenuItem divider button onClick={this.goBack}>\n                    <ListItemIcon classes={{ root: classes.header }}>\n                      <ChevronLeft className={classes.icon} />\n                    </ListItemIcon>\n                    <ListItemText\n                      classes={{ root: classes.headerText }}\n                      primary={<div className={classes.headerText}>{list.text} </div>}\n                    />\n                  </MenuItem>\n                )}\n                {list.items &&\n                  list.items.map((item, key) => (\n                    <Item\n                      {...this.props}\n                      item={item}\n                      key={key}\n                      depth={depth}\n                      classes={{ list: classes.list, listItem: classes.listItem }}\n                    />\n                  ))}\n                {list.root && rootFooter}\n              </MenuList>\n            ))}\n          </div>\n        )}\n      </Fragment>\n    )\n  }\n\n  /**\n   * Renders the menu as a simple list of expandable sections\n   * @return {MenuList}\n   */\n  renderSimple() {\n    const {\n      rootHeader,\n      rootFooter,\n      app: { menu }\n    } = this.props\n\n    const { classes } = this.context\n    const root = menu && menu.levels && menu.levels[0]\n\n    if (!root) return null\n\n    return (\n      <MenuList classes={{ padding: classes.list }}>\n        {rootHeader}\n        {root.items.map((item, i) => (\n          <Item {...this.props} depth={1} item={item} key={i} />\n        ))}\n        {rootFooter}\n      </MenuList>\n    )\n  }\n\n  goBack = () => {\n    this.props.app.menu.goBack()\n  }\n}\n",
    description: '',
    displayName: 'Body',
    methods: [
      {
        name: 'renderSimple',
        docblock: 'Renders the menu as a simple list of expandable sections\n@return {MenuList}',
        modifiers: [],
        params: [],
        returns: { description: null, type: { name: 'MenuList' } },
        description: 'Renders the menu as a simple list of expandable sections'
      },
      { name: 'goBack', docblock: null, modifiers: [], params: [], returns: null }
    ],
    styles: { classes: [], name: null },
    props: []
  },
  Branch: {
    id: 'Branch',
    filename: 'Branch',
    importPath: 'menu/Branch',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport MenuList from '@material-ui/core/MenuList'\nimport MenuItem from '@material-ui/core/MenuItem'\nimport Collapse from '@material-ui/core/Collapse'\nimport classnames from 'classnames'\nimport ItemContent from './ItemContent'\nimport Item from './Item'\nimport MenuContext from './MenuContext'\n\n@inject('app')\n@observer\nexport default class Branch extends Component {\n  static contextType = MenuContext\n\n  render() {\n    let {\n      app: { menu, amp },\n      useExpanders,\n      simple,\n      depth,\n      index,\n      item,\n      ...others\n    } = this.props\n\n    const { classes } = this.context\n    const showExpander = simple || (depth > 0 && useExpanders)\n\n    const interactionProps = {\n      onClick: showExpander\n        ? this.toggleItemExpaned.bind(this, item)\n        : this.slideToItem.bind(this, item, menu),\n      classes: {\n        root: classnames(classes.listItem, item.className, {\n          [classes.expanded]: item.expanded,\n          [classes.expander]: showExpander\n        })\n      }\n    }\n\n    const sublist = `${depth}.${index}`\n\n    const ampProps = {\n      on:\n        depth === 0\n          ? `tap:AMP.setState({ list: '@${index}' })`\n          : `tap:AMP.setState({ sublist: sublist == '${sublist}' ? null : '${sublist}' })`\n    }\n\n    const elements = [\n      <div key=\"item\" amp-bind={`class=>sublist == '${sublist}' ? 'expanded' : ''`}>\n        <MenuItem className=\"menu-item\" button divider {...(amp ? ampProps : interactionProps)}>\n          <ItemContent\n            {...others}\n            item={item}\n            leaf={false}\n            showExpander={showExpander}\n            sublist={sublist}\n          />\n        </MenuItem>\n      </div>\n    ]\n\n    if (showExpander) {\n      const props = amp\n        ? {\n            in: true,\n            'amp-bind': `class=>sublist == '${sublist}' ? '${classes.visible}' : '${\n              classes.hidden\n            }'`\n          }\n        : { in: item.expanded }\n      elements.push(\n        <Collapse {...props} timeout=\"auto\" key=\"collapse\">\n          <MenuList component=\"div\" classes={{ root: classes.list }}>\n            {item.items &&\n              item.items.map((item, i) => (\n                <Item {...this.props} depth={depth + 1} item={item} key={i} />\n              ))}\n          </MenuList>\n        </Collapse>\n      )\n    }\n\n    return <Fragment>{elements}</Fragment>\n  }\n\n  slideToItem = (item, menu) => {\n    const { expandFirstItem } = this.props\n    menu.setSelected(item, { expandFirstItem })\n  }\n\n  toggleItemExpaned = item => {\n    item.toggle()\n  }\n}\n",
    description: '',
    displayName: 'Branch',
    methods: [
      {
        name: 'slideToItem',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }, { name: 'menu', type: null }],
        returns: null
      },
      {
        name: 'toggleItemExpaned',
        docblock: null,
        modifiers: [],
        params: [{ name: 'item', type: null }],
        returns: null
      }
    ],
    styles: { classes: [], name: null },
    props: []
  },
  ExpanderIcon: {
    id: 'ExpanderIcon',
    filename: 'ExpanderIcon',
    importPath: 'menu/ExpanderIcon',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport ChevronRight from '@material-ui/icons/ChevronRight'\nimport ExpandLess from '@material-ui/icons/ExpandLess'\nimport ExpandMore from '@material-ui/icons/ExpandMore'\nimport MenuContext from './MenuContext'\n\n@inject('app')\n@observer\nexport default class ExpanderIcon extends Component {\n  static contextType = MenuContext\n\n  render() {\n    let {\n      app: { amp },\n      ExpandIcon,\n      CollapseIcon,\n      theme,\n      showExpander,\n      sublist,\n      item\n    } = this.props\n\n    const { classes } = this.context\n\n    ExpandIcon = ExpandIcon || theme.ExpandIcon || ExpandMore\n    CollapseIcon = CollapseIcon || theme.CollapseIcon || ExpandLess\n\n    if (!showExpander) return <ChevronRight className={classes.icon} />\n\n    if (amp) {\n      return (\n        <Fragment>\n          <CollapseIcon\n            className={classes.icon}\n            amp-bind={`class=>sublist == '${sublist}' ? '${classes.visible} ${classes.icon}' : '${\n              classes.hidden\n            } ${classes.icon}'`}\n          />\n          <ExpandIcon\n            className={classes.icon}\n            amp-bind={`class=>sublist == '${sublist}' ? '${classes.hidden} ${classes.icon}' : '${\n              classes.visible\n            } ${classes.icon}'`}\n          />\n        </Fragment>\n      )\n    } else {\n      return item.expanded ? (\n        <CollapseIcon className={classes.icon} />\n      ) : (\n        <ExpandIcon className={classes.icon} />\n      )\n    }\n  }\n}\n",
    description: '',
    displayName: 'ExpanderIcon',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  Item: {
    id: 'Item',
    filename: 'Item',
    importPath: 'menu/Item',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport Branch from './Branch'\nimport Leaf from './Leaf'\n\n@inject('app')\n@observer\nexport default class Item extends Component {\n  render() {\n    let NodeType = Leaf\n\n    const { item } = this.props\n\n    if (item.items) {\n      NodeType = Branch\n    }\n\n    return (\n      <NodeType\n        expandFirstItem={this.props.expandFirstItem}\n        itemRenderer={this.props.itemRenderer}\n        trackSelected={this.props.trackSelected}\n        ExpandIcon={this.props.ExpandIcon}\n        CollapseIcon={this.props.CollapseIcon}\n        theme={this.props.theme}\n        item={item}\n        index={this.props.index}\n        depth={this.props.depth}\n        useExpanders={this.props.useExpanders}\n        simple={this.props.simple}\n        depth={this.props.depth}\n      />\n    )\n  }\n}\n",
    description: '',
    displayName: 'Item',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  ItemContent: {
    id: 'ItemContent',
    filename: 'ItemContent',
    importPath: 'menu/ItemContent',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport ListItemText from '@material-ui/core/ListItemText'\nimport ListItemIcon from '@material-ui/core/ListItemIcon'\nimport MenuContext from './MenuContext'\nimport ExpanderIcon from './ExpanderIcon'\n\n@inject('app')\n@observer\nexport default class ItemContent extends Component {\n  static contextType = MenuContext\n\n  render() {\n    let { itemRenderer, item, leaf } = this.props\n\n    const { classes } = this.context\n\n    let contents\n\n    if (itemRenderer) {\n      contents = itemRenderer(item, leaf)\n    }\n\n    if (contents) {\n      return contents\n    } else if (leaf) {\n      return (\n        <Fragment>\n          {item.image && (\n            <ListItemIcon>\n              <img className={classes.listItemImage} alt={item.text} src={item.image} />\n            </ListItemIcon>\n          )}\n          <ListItemText primary={item.text} disableTypography />\n        </Fragment>\n      )\n    } else {\n      return (\n        <Fragment>\n          {item.image && (\n            <ListItemIcon>\n              <img className={classes.listItemImage} alt={item.text} src={item.image} />\n            </ListItemIcon>\n          )}\n          <ListItemText className={classes.listItem} primary={item.text} disableTypography />\n          <ListItemIcon className={classes.listItemIcon}>\n            <ExpanderIcon {...this.props} />\n          </ListItemIcon>\n        </Fragment>\n      )\n    }\n  }\n}\n",
    description: '',
    displayName: 'ItemContent',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  Leaf: {
    id: 'Leaf',
    filename: 'Leaf',
    importPath: 'menu/Leaf',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment, PureComponent } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport MenuItem from '@material-ui/core/MenuItem'\nimport classnames from 'classnames'\nimport ItemContent from './ItemContent'\nimport Link from '../Link'\nimport MenuContext from './MenuContext'\n\n@inject('app')\n@observer\nexport default class Leaf extends Component {\n  static contextType = MenuContext\n\n  render() {\n    const { item, app, trackSelected, ...others } = this.props\n    const { classes } = this.context\n\n    return (\n      <Link\n        to={item.url}\n        className={classes.link}\n        server={item.server}\n        state={item.state ? () => JSON.parse(item.state) : null}\n        onClick={this.onClick}\n      >\n        <MenuItem\n          button\n          divider\n          selected={trackSelected && app.location.pathname === item.url.replace(/\\?.*/, '')}\n          classes={{\n            root: classnames(classes.listItem, classes.leaf, item.className)\n          }}\n        >\n          <ItemContent {...others} item={item} showExpander={false} leaf />\n        </MenuItem>\n      </Link>\n    )\n  }\n\n  onClick = () => {\n    this.props.app.menu.close()\n  }\n}\n",
    description: '',
    displayName: 'Leaf',
    methods: [{ name: 'onClick', docblock: null, modifiers: [], params: [], returns: null }],
    styles: { classes: [], name: null },
    props: []
  },
  MenuBody: {
    id: 'MenuBody',
    filename: 'MenuBody',
    importPath: 'menu/MenuBody',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport ListItemText from '@material-ui/core/ListItemText'\nimport MenuList from '@material-ui/core/MenuList'\nimport MenuItem from '@material-ui/core/MenuItem'\nimport ChevronLeft from '@material-ui/icons/ChevronLeft'\nimport ListItemIcon from '@material-ui/core/ListItemIcon'\nimport classnames from 'classnames'\nimport Item from './Item'\nimport MenuContext from './MenuContext'\n\nexport default class MenuBody extends Component {\n  static contextType = MenuContext\n\n  render() {\n    const { classes, rootHeader, rootFooter, root, path, depth } = this.props\n\n    const parentPath = path.length ? '@' + path.slice(0, path.length - 1).join(',') : null\n\n    const id = '@' + path.join(',')\n\n    const isRoot = id === '@'\n\n    const header = !isRoot && (\n      <MenuItem divider button on={`tap:AMP.setState({ list: '${parentPath}' })`}>\n        <ListItemIcon classes={{ root: classes.header }}>\n          <ChevronLeft className={classes.icon} />\n        </ListItemIcon>\n        <ListItemText\n          classes={{ root: classes.headerText }}\n          primary={<div className={classes.headerText}>{root.text} </div>}\n        />\n      </MenuItem>\n    )\n\n    return (\n      <div\n        className={classnames(classes.ampBody, {\n          [classes.inFocus]: isRoot,\n          [classes.hiddenRight]: !isRoot\n        })}\n        amp-bind={`class=>list == '${id}'  ? '${classnames(\n          classes.ampBody,\n          classes.inFocus\n        )}' : '${classnames(classes.ampBody, {\n          [classes.hiddenLeft]: isRoot,\n          [classes.hiddenRight]: !isRoot\n        })}'`}\n      >\n        <MenuList classes={{ padding: classes.ampList }}>\n          {rootHeader}\n          {header}\n          {root.items.map((item, i) => (\n            <Fragment>\n              <Item {...this.props} depth={depth} item={item} key={i} index={i} />\n            </Fragment>\n          ))}\n          {rootFooter}\n        </MenuList>\n      </div>\n    )\n  }\n}\n",
    description: '',
    displayName: 'MenuBody',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  },
  SEOLinks: {
    id: 'SEOLinks',
    filename: 'SEOLinks',
    importPath: 'menu/SEOLinks',
    src:
      "/**\n * @license\n * Copyright © 2017-2019 Moov Corporation.  All rights reserved.\n */\nimport React, { Component, Fragment } from 'react'\nimport { observer, inject } from 'mobx-react'\nimport Link from '../Link'\nimport NoScript from '../NoScript'\n\n@inject('app')\n@observer\nexport default class SEOLinks extends Component {\n  render() {\n    const levels = this.props.app.menu.levels\n    const root = levels.length && levels[0]\n\n    if (!root) return null\n\n    let links = [],\n      key = 0\n\n    const findLinks = ({ items }) => {\n      for (let i = 0; i < items.length; i++) {\n        const item = items[i]\n\n        if (item.url) {\n          links.push(\n            <Link key={key++} to={item.url}>\n              {item.text}\n            </Link>\n          )\n        }\n\n        if (item.items) {\n          findLinks(item)\n        }\n      }\n    }\n\n    findLinks(root)\n\n    return (\n      <Fragment>\n        {/* \n        React doesn't execute the children of a noscript on the client, \n        therefore the style rules for Link will get written out of order\n        unless we force a Link to render here.\n        */}\n        <div style={{ display: 'none' }}>\n          <Link />\n        </div>\n        <NoScript>\n          <nav\n            style={{\n              position: 'absolute',\n              top: 0,\n              left: 0,\n              height: '1px',\n              width: '1px',\n              overflow: 'hidden'\n            }}\n          >\n            {links}\n          </nav>\n        </NoScript>\n      </Fragment>\n    )\n  }\n}\n",
    description: '',
    displayName: 'SEOLinks',
    methods: [],
    styles: { classes: [], name: null },
    props: []
  }
}
export default data
