# Generated by Django 3.0.8 on 2020-08-14 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_add_file_to_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
