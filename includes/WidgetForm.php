<?php

namespace Modules\Url_viewer\Includes;

use Zabbix\Widgets\CWidgetField;
use Zabbix\Widgets\CWidgetForm;
use Zabbix\Widgets\Fields\CWidgetFieldSelect;
use Zabbix\Widgets\Fields\CWidgetFieldTextBox;

class WidgetForm extends CWidgetForm{
    public function addFields(): self {
        return $this
            ->addField((new CWidgetFieldTextBox('URL', _('URL completa')))
            ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK))    
        ;
    }
}
