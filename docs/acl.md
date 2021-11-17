**Exemple d'ACL pour une soirée privée**

| Action | Roles autorisés |
|--|--|
| Marcher | invité, employé |
| Boire du :champagne: | invité |
| Respirer | invité, employé |
| Discuter | invité |
| Travailler | employé |


Pour notre back-office, ce serait par exemple

```php
$acl = [
    /* nom de la route => rôles autorisés */
    'category-list' => ['admin', 'catalog-manager'],
    'user-list' => ['admin']
    // etc
]
```