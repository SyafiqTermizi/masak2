# Generated by Django 3.0.8 on 2020-07-03 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='amount',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
