<?php declare(strict_types = 0);

use Zabbix\Widgets\Fields\CWidgetFieldTextBox;

/**
 * Problems widget form view.
 *
 * @var CView $this
 * @var array $data
 */

(new CWidgetFormView($data))
    ->addField(
        new CWidgetFieldTextBoxView($data['fields']['url'])
    )
    /*->addFieldset((new CWidgetFormFieldsetCollapsibleView(_('Configurações Avançadas')))
        ->addField(
            new CWidgetFieldSelectView($data['fields']['service'])
        )
        ->addField(
            new CWidgetFieldTextBoxView($data['fields']['endpoint'])
        )
        ->addField(
            new CWidgetFieldTextBoxView($data['fields']['model'])
        )
        ->addField(
            (new CWidgetFieldTextBoxView($data['fields']['temperature']))
                ->setFieldHint(
                    makeHelpIcon(_('Qual temperatura de amostragem usar, entre 0 e 2. Valores mais altos, como 0,8, tornam a saída mais aleatória, enquanto valores mais baixos, como 0,2, tornam-na mais focada e determinística.'), 'icon-help')
                )
        )
        ->addField(
            (new CWidgetFieldTextBoxView($data['fields']['top_p']))
                ->setFieldHint(
                    makeHelpIcon(_('Uma alternativa à amostragem com temperatura, chamada amostragem por núcleo (nucleus sampling), onde o modelo considera os resultados dos tokens com a maior massa de probabilidade top_p. Então, 0,1 significa que apenas os tokens que compõem os 10% principais da massa de probabilidade são considerados.'), 'icon-help')
                )
        )
        ->addField(
            (new CWidgetFieldTextBoxView($data['fields']['max_tokens']))
                ->setFieldHint(
                    makeHelpIcon(_('O número máximo de tokens a serem gerados na conclusão.'), 'icon-help')
                )
        )
        ->addField(
            (new CWidgetFieldTextBoxView($data['fields']['n']))
                ->setFieldHint(
                    makeHelpIcon(_('Quantas conclusões gerar para cada prompt.'), 'icon-help')
                )
        )
    )*/

    ->includeJsFile('widget.edit.js.php')
    ->addJavaScript('widget_openai_form.init();')
	->show();
