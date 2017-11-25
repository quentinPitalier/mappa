<?xml version="1.0" encoding="UTF-8" ?>
<Package name="TrainingApp" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="behavior_1" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs>
        <Dialog name="basicChannelDialog" src="basicChannelDialog/basicChannelDialog.dlg" />
        <Dialog name="dialog" src="dialog/dialog.dlg" />
    </Dialogs>
    <Resources>
        <File name="demo-service" src="demo-service.py" />
        <File name="icon" src="icon.png" />
        <File name="sendingData" src="sendingData.py" />
        <File name="test" src="test.pmt" />
        <File name="Rain Rain Go Away" src="Rain Rain Go Away.mp3" />
        <File name="choice_sentences" src="behavior_1/Aldebaran/choice_sentences.xml" />
        <File name="__init__" src="lib/pyrebase/__init__.py" />
        <File name="pyrebase.cpython-36" src="lib/pyrebase/__pycache__/pyrebase.cpython-36.pyc" />
        <File name="pyrebase" src="lib/pyrebase/pyrebase.py" />
        <File name="sendingData" src="lib/pyrebase/sendingData.py" />
    </Resources>
    <Topics>
        <Topic name="basicChannelDialog_enu" src="basicChannelDialog/basicChannelDialog_enu.top" topicName="basicChannelDialog" language="en_US" />
        <Topic name="dialog_enu" src="dialog/dialog_enu.top" topicName="dialog" language="en_US" />
        <Topic name="basicChannelDialog_fif" src="basicChannelDialog/basicChannelDialog_fif.top" topicName="basicChannelDialog" language="fi_FI" />
        <Topic name="dialog_fif" src="dialog/dialog_fif.top" topicName="dialog" language="fi_FI" />
    </Topics>
    <IgnoredPaths />
    <Translations auto-fill="en_US">
        <Translation name="translation_en_US" src="translations/translation_en_US.ts" language="en_US" />
        <Translation name="translation_fi_FI" src="translations/translation_fi_FI.ts" language="fi_FI" />
    </Translations>
</Package>
