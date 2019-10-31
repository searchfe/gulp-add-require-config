require.config({paths:{"test/a_556240b":"//xxx/xx/assert/bundle_xxxxxxx","test/b_fd483c4":"//xxx/xx/assert/bundle_xxxxxxx"}});
import { a } from './a';
import { b } from './b';
export default class test {
    constructor () {
        a(page, 'init');
        b(page, 'ready'); 
    }
}
