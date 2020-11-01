import { template as baseLayout, injectableContent } from '../../container/base_layout';

const template = `
    <div id="container" class="container">
        <div>
            Home
        </div>
    </div>
`;

const renderTemplate = () => {
    const layout = baseLayout.replace(injectableContent, template);
    return layout;
}

export default renderTemplate;
