# Generated by Django 3.0.8 on 2020-07-03 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0002_ingredient_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='note',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]