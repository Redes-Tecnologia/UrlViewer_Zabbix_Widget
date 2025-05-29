<?php declare(strict_types = 0);

use Zabbix\Widgets\Fields\CWidgetFieldTextBox;

/*
** initMAX
** Copyright (C) 2021-2022 initMAX s.r.o.
**
** This program is free software; you can redistribute it and/or modify
** it under the terms of the GNU General Public License as published by
** the Free Software Foundation; either version 3 of the License, or
** (at your option) any later version.
**
** This program is distributed in the hope that it will be useful,
** but WITHOUT ANY WARRANTY; without even the implied warranty of
** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
** GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License
** along with this program; if not, write to the Free Software
** Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
**/

/**
 * Problems widget form view.
 *
 * @var CView $this
 * @var array $data
 */

(new CWidgetFormView($data))
    ->addField(
        new CWidgetFieldTextBoxView($data['fields']['token'])
    )
    ->addFieldset((new CWidgetFormFieldsetCollapsibleView(_('Configurações Avançadas')))
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
    )

    ->includeJsFile('widget.edit.js.php')
    ->addJavaScript('widget_openai_form.init();')
	->show();
