# Generated by Django 3.0.8 on 2020-07-04 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
        ('steps', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='step',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='recipes.Recipe'),
        ),
    ]
