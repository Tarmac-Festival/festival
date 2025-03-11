//https://github.com/summernote/summernote/issues/4704
// app.js
import jQuery from 'jquery'
import * as bootstrap from 'bootstrap'

const JQUERY_NO_CONFLICT = jQuery.fn['tooltip']
jQuery.fn['tooltip'] = bootstrap.Tooltip.jQueryInterface
jQuery.fn['tooltip'].Constructor = bootstrap.Tooltip
jQuery.fn['tooltip'].noConflict = () => {
    jQuery.fn['tooltip'] = JQUERY_NO_CONFLICT
    return bootstrap.Tooltip.jQueryInterface
}

window.$ = window.jQuery = jQuery