<template>
  <div :class="computedClasses" class="material-input__component">
    <div :class="{ iconClass: icon }">
      <a-icon
        v-if="icon"
        :type="icon"
        class="material-input__icon"
      />
      <a-input
        v-if="type === 'email'"
        v-model:value="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="email"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      />
      <a-input
        v-if="type === 'url'"
        v-model:value="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="url"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      />
      <a-input
        v-if="type === 'number'"
        v-model:value="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :step="step"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :max="max"
        :min="min"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="number"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      />
      <a-input
        v-if="type === 'password'"
        v-model:value="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :max="max"
        :min="min"
        :required="required"
        type="password"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      />
      <a-input
        v-if="type === 'tel'"
        v-model:value="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="tel"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      />
      <a-input
        v-if="type === 'text'"
        v-model:value="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="text"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      />
      <span class="material-input-bar" />
      <label class="material-label">
        <slot />
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { Input, Icon } from 'ant-design-vue';

export default defineComponent({
  name: 'MdInput',
  components: {
    AInput: Input,
    AIcon: Icon,
  },
  props: {
    icon: String,
    name: String,
    type: {
      type: String,
      default: 'text',
    },
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    min: String,
    max: String,
    step: String,
    minlength: Number,
    maxlength: Number,
    required: {
      type: Boolean,
      default: true,
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:value', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const currentValue = ref(props.value);
    const focus = ref(false);
    const fillPlaceHolder = ref(null);

    const computedClasses = computed(() => ({
      'material--active': focus.value,
      'material--disabled': props.disabled,
      'material--raised': focus.value || Boolean(currentValue.value),
    }));

    watch(() => props.value, (newValue) => {
      currentValue.value = newValue;
    });

    const handleModelInput = (event) => {
      const value = event.target.value;
      emit('update:value', value);
      emit('change', value);
    };

    const handleMdFocus = (event) => {
      focus.value = true;
      emit('focus', event);
      if (props.placeholder && props.placeholder !== '') {
        fillPlaceHolder.value = props.placeholder;
      }
    };

    const handleMdBlur = (event) => {
      focus.value = false;
      emit('blur', event);
      fillPlaceHolder.value = null;
    };

    return {
      currentValue,
      focus,
      fillPlaceHolder,
      computedClasses,
      handleModelInput,
      handleMdFocus,
      handleMdBlur,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "sass:math";

$font-size-base: 16px;
$font-size-small: 18px;
$font-size-smallest: 12px;
$font-weight-normal: normal;
$font-weight-bold: bold;
$apixel: 1px;
// Utils
$spacer: 12px;
$transition: 0.2s ease all;
$index: 0px;
$index-has-icon: 30px;
// Theme:
$color-white: white;
$color-grey: #9e9e9e;
$color-grey-light: #e0e0e0;
$color-blue: #2196f3;
$color-red: #f44336;
$color-black: black;
// Base clases:
%base-bar-pseudo {
  content: '';
  height: 1px;
  width: 0;
  bottom: 0;
  position: absolute;
  transition: $transition;
} /*// Mixins:*/
@mixin slided-top() {
  top: -($font-size-base + $spacer);
  left: 0;
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
} /*// Component:*/
.material-input__component {
  margin-top: 36px;
  position: relative;
  * {
    box-sizing: border-box;
  }
  .iconClass {
    .material-input__icon {
      position: absolute;
      left: 0;
      line-height: $font-size-base;
      color: $color-blue;
      top: $spacer;
      width: $index-has-icon;
      height: $font-size-base;
      font-size: $font-size-base;
      font-weight: $font-weight-normal;
      pointer-events: none;
    }
    .material-label {
      left: $index-has-icon;
    }
    .material-input {
      text-indent: $index-has-icon;
    }
  }
  .material-input {
    font-size: $font-size-base;
    padding: $spacer $spacer $spacer - $apixel * 10 math.div($spacer, 2);
    display: block;
    width: 100%;
    border: none;
    line-height: 1;
    border-radius: 0;
    &:focus {
      outline: none;
      border: none;
      border-bottom: 1px solid transparent; // fixes the height issue
    }
  }
  .material-label {
    font-weight: $font-weight-normal;
    position: absolute;
    pointer-events: none;
    left: $index;
    top: 0;
    transition: $transition;
    font-size: $font-size-small;
  }
  .material-input-bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      @extend %base-bar-pseudo;
      left: 50%;
    }
    &:after {
      @extend %base-bar-pseudo;
      right: 50%;
    }
  }
  // Disabled state:
  &.material--disabled {
    .material-input {
      border-bottom-style: dashed;
    }
  }
  // Raised state:
  &.material--raised {
    .material-label {
      @include slided-top();
    }
  }
  // Active state:
  &.material--active {
    .material-input-bar {
      &:before,
      &:after {
        width: 50%;
      }
    }
  }
}
.material-input__component {
  background: $color-white;
  .material-input {
    background: none;
    color: $color-black;
    text-indent: $index;
    border-bottom: 1px solid $color-grey-light;
  }
  .material-label {
    color: $color-grey;
  }
  .material-input-bar {
    &:before,
    &:after {
      background: $color-blue;
    }
  }
  // Active state:
  &.material--active {
    .material-label {
      color: $color-blue;
    }
  }
  // Errors:
  &.material--has-errors {
    &.material--active .material-label {
      color: $color-red;
    }
    .material-input-bar {
      &:before,
      &:after {
        background: transparent;
      }
    }
  }
}
</style>