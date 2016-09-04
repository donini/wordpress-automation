# DON-WORDPRESS-BOILERPLATE

## Ready to build single-page

It's very simple to create a single page, you just need create a parent page, like a 'Single page', and create some child pages, this child pages will be the sections of the single page.

![alt text](http://www.wing.inf.br/github/wpbp/wpbp_section-container.png "Single Page - Section container")

This parent page must be configured with the template 'Section-container'. This will render all the child pages defined in the manager, with their specific template.

The file of template page must have the following structure:

```shell
page-[SLUG-OF-PAGE].php
```
