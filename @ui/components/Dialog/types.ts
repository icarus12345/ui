import type { Ref, HTMLAttributes } from 'vue'
import type { PrimitiveProps } from '../Primitive'
import type { DismissableLayerEmits, DismissableLayerProps } from '../DismissableLayer/types'
// import { createContext } from '@/shared'
import type { TeleportProps } from '../Teleport/types'

export interface DialogTriggerProps extends PrimitiveProps {}

export interface DialogRootProps {
  /** The controlled open state of the dialog. Can be binded as `v-model:open`. */
  open?: boolean
  /** The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean
  /**
   * The modality of the dialog When set to `true`, <br>
   * interaction with outside elements will be disabled and only dialog content will be visible to screen readers.
   */
  modal?: boolean
}

export type DialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean]
}

export interface DialogRootContext {
  open: Ref<boolean>
  modal: Ref<boolean>
  openModal: () => void
  onOpenChange: (value: boolean) => void
  onOpenToggle: () => void
  triggerElement: Ref<HTMLElement | undefined>
  contentElement: Ref<HTMLElement | undefined>
  contentId: string
  titleId: string
  descriptionId: string
}

export interface DialogCloseProps extends PrimitiveProps {}
export interface DialogDescriptionProps extends PrimitiveProps {}
export interface DialogOverlayImplProps extends PrimitiveProps {}
export interface DialogTitleProps extends PrimitiveProps {}
export type DialogContentImplEmits = DismissableLayerEmits & {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event]
}

export interface DialogContentImplProps extends DismissableLayerProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling transntion with Vue native transition or other animation libraries.
   */
  forceMount?: boolean
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapFocus?: boolean
}

export type DialogContentEmits = DialogContentImplEmits

export interface DialogContentProps extends DialogContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean,
  class?: HTMLAttributes['class'],
  width?: string,
  size?: string,
  ui?: object
}

export interface DialogOverlayProps extends DialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}

export const [injectDialogRootContext, provideDialogRootContext] = createContext<DialogRootContext>('DialogRoot')

export type DialogWidth =  "xs" | "sm" | "md"
export type DialogSize =  "xs" | "sm" | "md"
export type DialogType =  "alert" | "warning" | "success" | "error" | "confirm" | "information"


export interface DialogPortalProps extends TeleportProps {}