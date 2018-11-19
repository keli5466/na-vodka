// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  site: "https://content-dev.newamsterdamspirits.com",
  url_content_panels: "/views/panels/node",
  url_homepage: "/homepage?_format=json",
  url_homepage_featured_content: "/views/featuredcontent",
  url_aboutpage: "/about?_format=json",
  url_acceptable_use_policy_page: "/acceptable-use-policy?_format=json",
  url_flavors_page: "/flavors?_format=json",
  url_privacy_policy_page: "/privacy-policy?_format=json",
  url_productlist: "/views/spirits?_format=json", // all products in the catalog
  url_productdetails: "/flavors",   // details for a specific product by the flavor path and ?_format=json
  url_trademarks: "/trademarks?_format=json",
  url_wheretobuypage: "",	// "where to buy" page content
  url_recipelist: "/views/recipe/all",	// list of recipes for the "drinks" page
  url_recipedetails_page: "/recipes", // details for the given recipe/drink
  url_recipedetails_view: "/views/recipe",
  url_recipepage: "/recipes?_format=json",
  url_use_agreement: "/use-agreement?_format=json",
  aws_apikey: "hB7B8T98RX8JDeFnsHPX35VtIc8NIbUK51REQCBP",
  aws_rooturl: "https://c4tqk9bhdk.execute-api.us-west-2.amazonaws.com/DEV"
};
