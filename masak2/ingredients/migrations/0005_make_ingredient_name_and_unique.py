# Generated by Django 3.0.8 on 2020-07-04 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0004_make_amount_and_unit_not_required'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredientname',
            name='name',
            field=models.CharField(help_text='onion, flour...', max_length=255, unique=True),
        ),
    ]