declare module '@base-ui/react/avatar' {
  export const Avatar: any
  export namespace Avatar {
    namespace Root {
      type Props = any
    }
    namespace Image {
      type Props = any
    }
    namespace Fallback {
      type Props = any
    }
  }
}

declare module '@base-ui/react/button' {
  export const Button: any
  export namespace Button {
    type Props = any
  }
}

declare module '@base-ui/react/dialog' {
  export const Dialog: any
  export namespace Dialog {
    namespace Root {
      type Props = any
    }
    namespace Trigger {
      type Props = any
    }
    namespace Portal {
      type Props = any
    }
    namespace Close {
      type Props = any
    }
    namespace Backdrop {
      type Props = any
    }
    namespace Popup {
      type Props = any
    }
    namespace Title {
      type Props = any
    }
    namespace Description {
      type Props = any
    }
  }
}

declare module '@base-ui/react/menu' {
  export const Menu: any
  export namespace Menu {
    namespace Root {
      type Props = any
    }
    namespace Portal {
      type Props = any
    }
    namespace Trigger {
      type Props = any
    }
    namespace Positioner {
      type Props = any
    }
    namespace Popup {
      type Props = any
    }
    namespace Group {
      type Props = any
    }
    namespace GroupLabel {
      type Props = any
    }
    namespace Item {
      type Props = any
    }
    namespace SubmenuRoot {
      type Props = any
    }
    namespace SubmenuTrigger {
      type Props = any
    }
    namespace CheckboxItem {
      type Props = any
    }
    namespace CheckboxItemIndicator {
      type Props = any
    }
    namespace RadioGroup {
      type Props = any
    }
    namespace RadioItem {
      type Props = any
    }
    namespace RadioItemIndicator {
      type Props = any
    }
    namespace Separator {
      type Props = any
    }
  }
}

declare module '@base-ui/react/tooltip' {
  export const Tooltip: any
  export namespace Tooltip {
    namespace Provider {
      type Props = any
    }
    namespace Root {
      type Props = any
    }
    namespace Trigger {
      type Props = any
    }
    namespace Popup {
      type Props = any
    }
    namespace Positioner {
      type Props = any
    }
    namespace Portal {
      type Props = any
    }
    namespace Arrow {
      type Props = any
    }
  }
}

declare module '@base-ui/react/progress' {
  export const Progress: any
  export namespace Progress {
    namespace Root {
      type Props = any
    }
    namespace Track {
      type Props = any
    }
    namespace Indicator {
      type Props = any
    }
    namespace Label {
      type Props = any
    }
    namespace Value {
      type Props = any
    }
  }
}

declare module '@base-ui/react/input' {
  export const Input: any
}

declare module '@base-ui/react/separator' {
  export const Separator: any
  export namespace Separator {
    type Props = any
  }
}

declare module '@base-ui/react/merge-props' {
  export function mergeProps<T = any>(...args: any[]): T
}

declare module '@base-ui/react/use-render' {
  export function useRender(props: any): any
  export namespace useRender {
    type ComponentProps<TTag = any> = any
  }
}