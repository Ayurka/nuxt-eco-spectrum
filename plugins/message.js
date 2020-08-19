import Vue from 'vue';
import UIkit from 'uikit';

Vue.prototype.$message = function (message) {
  UIkit.notification({
    message: '<span uk-icon="icon: check;" class="uk-notification-message-success-icon"></span> ' + message,
    status: 'success',
    pos: 'top-right',
    timeout: 5000
  })
}

Vue.prototype.$error = function (error) {
  UIkit.notification({
    message: '<span uk-icon="icon: warning;" class="uk-notification-message-danger-icon"></span> ' + error,
    status: 'danger',
    pos: 'top-right',
    timeout: 5000
  })
}
