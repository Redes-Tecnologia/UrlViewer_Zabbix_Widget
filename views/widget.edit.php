<?php declare(strict_types = 0);

use Zabbix\Widgets\Fields\CWidgetFieldTextBox;
/**
 * Problems widget form view.
 *
 * @var CView $this
 * @var array $data
 */

(new CWidgetFormView($data))
    ->addField((new CWidgetFieldTextBoxView($data['fields']['URL']))
        ->setFieldHint(makeHelpIcon(_('Coloque a Url que deseja exibir no widget'), 'icon-help'))
    )
    ->includeJsFile('widget.edit.js.php')
    ->addJavaScript('widget_urlviewer_form.init();')
	->show();
