<?php

namespace Modules\CFTVmjpeg\Includes;

use Zabbix\Widgets\CWidgetField;
use Zabbix\Widgets\CWidgetForm;
use Zabbix\Widgets\Fields\CWidgetFieldSelect;
use Zabbix\Widgets\Fields\CWidgetFieldTextBox;

/**
 * ChatGPT widget form.
 */

class WidgetForm extends CWidgetForm
{
    public function addFields(): self {
        return $this
            /*->addField(
                (new CWidgetFieldSelect('service', _('Service'), [
                        0 => 'OpenAI',
                        1 => 'DeepSeek',
                    ]))
                    ->setDefault(0)
                    ->setFlags(CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldTextBox('endpoint', _('Endpoint')))
                    ->setDefault('https://api.openai.com/v1/chat/completions')
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )*/
            ->addField(
                (new CWidgetFieldSelect('tipo', _('Tipo do vídeo'), [
                        0 => 'mjpeg',
                        1 => 'mjpg',
                    ]))
                    ->setDefault(0)
                    ->setFlags(CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldTextBox('serverIP', _('IP do servidor')))
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldTextBox('serverPort', _('Porta do servidor')))
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldTextBox('cameraIP', _('IP da câmera')))
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldTextBox('user', _('Usuário')))
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldTextBox('password', _('Senha')))
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )
            /*->addField(
                (new CWidgetFieldTextBox('model', _('Model')))
                    ->setDefault('gpt-3.5-turbo')
                    ->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
            )
            ->addField(
                (new CWidgetFieldSelect('model', _('Model'), [
                        0 => 'GPT-3.5 Turbo',
                        1 => 'Ainda precisa ser criado',
                    ]))
                    ->setDefault(0)
                    ->setFlags(CWidgetField::FLAG_DISABLED)
            )
            ->addField(
                (new CWidgetFieldTextBox('temperature', _('Temperature')))
                    ->setDefault('1')
            )
            ->addField(
                (new CWidgetFieldTextBox('top_p', _('Top P')))
                    ->setDefault('1')
            )
            ->addField(
                (new CWidgetFieldTextBox('max_tokens', _('Max tokens')))
                    ->setDefault('16')
            )
            ->addField(
                (new CWidgetFieldTextBox('n', _('N')))
                    ->setDefault('1')
            )*/
        ;
    }
}
