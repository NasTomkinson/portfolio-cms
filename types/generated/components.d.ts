import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentAccordion extends Struct.ComponentSchema {
  collectionName: 'components_component_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface ComponentBentoCard extends Struct.ComponentSchema {
  collectionName: 'components_component_bento_cards';
  info: {
    displayName: 'BentoCard';
    icon: 'apps';
  };
  attributes: {
    cardLink: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
    columns: Schema.Attribute.Integer;
    content: Schema.Attribute.Blocks;
    ctas: Schema.Attribute.Component<'component.cta', true>;
    heading: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    rows: Schema.Attribute.Integer;
    subheading: Schema.Attribute.String;
  };
}

export interface ComponentCompositeConfig extends Struct.ComponentSchema {
  collectionName: 'components_component_composite_configs';
  info: {
    displayName: 'Composite Config';
    icon: 'bulletList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'component.cta', false>;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface ComponentCta extends Struct.ComponentSchema {
  collectionName: 'components_component_ctas';
  info: {
    displayName: 'CTA';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
  };
}

export interface ComponentHoverCards extends Struct.ComponentSchema {
  collectionName: 'components_component_hover_cards';
  info: {
    displayName: 'Hover Cards';
  };
  attributes: {
    compositeConfig: Schema.Attribute.Component<
      'component.composite-config',
      false
    > &
      Schema.Attribute.Required;
    media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface CompositeAccordions extends Struct.ComponentSchema {
  collectionName: 'components_composite_accordions';
  info: {
    displayName: 'Accordions';
    icon: 'bulletList';
  };
  attributes: {
    accordion: Schema.Attribute.Component<'component.accordion', true>;
    compositeConfig: Schema.Attribute.Component<
      'component.composite-config',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface CompositeBento extends Struct.ComponentSchema {
  collectionName: 'components_composite_bentos';
  info: {
    displayName: 'Bento';
    icon: 'apps';
  };
  attributes: {
    bentoCards: Schema.Attribute.Component<'component.bento-card', true>;
    compositeConfig: Schema.Attribute.Component<
      'component.composite-config',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface CompositeContactForm extends Struct.ComponentSchema {
  collectionName: 'components_composite_contact_forms';
  info: {
    displayName: 'Contact Form';
    icon: 'layout';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface CompositeCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_composite_cta_sections';
  info: {
    displayName: 'CTA Section';
    icon: 'dashboard';
  };
  attributes: {
    compositeConfig: Schema.Attribute.Component<
      'component.composite-config',
      false
    > &
      Schema.Attribute.Required;
    content: Schema.Attribute.Blocks;
    ctas: Schema.Attribute.Component<'component.cta', true>;
    media: Schema.Attribute.Media<'images'>;
  };
}

export interface CompositeGenericContent extends Struct.ComponentSchema {
  collectionName: 'components_composite_generic_contents';
  info: {
    displayName: 'Generic Content';
    icon: 'pencil';
  };
  attributes: {
    copy: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
  };
}

export interface CompositeLogoCloud extends Struct.ComponentSchema {
  collectionName: 'components_composite_logo_clouds';
  info: {
    displayName: 'LogoCloud';
    icon: 'picture';
  };
  attributes: {
    compositeConfig: Schema.Attribute.Component<
      'component.composite-config',
      false
    > &
      Schema.Attribute.Required;
    media: Schema.Attribute.Media<'images', true>;
  };
}

export interface CompositeProjects extends Struct.ComponentSchema {
  collectionName: 'components_composite_projects';
  info: {
    displayName: 'Projects';
    icon: 'code';
  };
  attributes: {
    heading: Schema.Attribute.String;
    showProjects: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    >;
  };
}

export interface CompositeProjectsDescriptors extends Struct.ComponentSchema {
  collectionName: 'components_composite_projects_descriptors';
  info: {
    displayName: 'Projects Descriptors';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subheading: Schema.Attribute.Text;
  };
}

export interface CompositeTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_composite_testimonials';
  info: {
    displayName: 'Testimonials';
    icon: 'discuss';
  };
  attributes: {
    heading: Schema.Attribute.String;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.accordion': ComponentAccordion;
      'component.bento-card': ComponentBentoCard;
      'component.composite-config': ComponentCompositeConfig;
      'component.cta': ComponentCta;
      'component.hover-cards': ComponentHoverCards;
      'composite.accordions': CompositeAccordions;
      'composite.bento': CompositeBento;
      'composite.contact-form': CompositeContactForm;
      'composite.cta-section': CompositeCtaSection;
      'composite.generic-content': CompositeGenericContent;
      'composite.logo-cloud': CompositeLogoCloud;
      'composite.projects': CompositeProjects;
      'composite.projects-descriptors': CompositeProjectsDescriptors;
      'composite.testimonials': CompositeTestimonials;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
