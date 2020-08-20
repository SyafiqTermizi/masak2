# Generated by Django 3.1 on 2020-08-20 05:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_rename_tags'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
        migrations.CreateModel(
            name='SavedRecipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipes', models.ManyToManyField(to='recipes.Recipe')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='saved_recipes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
