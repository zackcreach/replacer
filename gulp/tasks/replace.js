const gulp = require("gulp");
const replace = require("gulp-replace");
const del = require("del");
const open = require("open");

const imgSource = "./input";
const imgDest = "./output";

gulp.task("copy", () => {
  gulp.src("./originals/**/*.html").pipe(gulp.dest("./replace"));
});

gulp.task("replace", () => {
  gulp
    .src("./replace/**/*.html", { base: "./" })
    .pipe(
      replace(
        /.*<!--.*LiveIntent(.|\n)+?(?=<!--)/gi,
        `         <!-- Ad Removed -->

        `,
      ),
    )
    .pipe(
      replace(
        /(.*<tr>\n).*(style="visibility:hidden; display:none;")(.|\n)+?(.*<\/td>\n.*<\/tr>)/gi,
        `          <!-- SafeRTB Removed -->

        `,
      ),
    )
    .pipe(
      replace(
        /.*<!--.*How did we do(.|\n)+?(?=<!--)/gi,
        `          <!-- Rating Removed -->

        `,
      ),
    )
    .pipe(
      replace(
        /.*<!--.*footer(.|\n)+?(?=<\/body>)/gi,
        `
          <!-- Footer Removed (Replaced) -->
          <tr>
            <td align="center" valign="top">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" valign="top" style="font-family:'Playfair Display', Times New Roman, serif; font-size:14px; color:#292929; padding:31px 0 14px 0;"><a href="https://www.thediscoverer.com/?utm_source=Edition%2032&utm_medium=email" target="_blank" style="color:#292929; text-decoration:none;"><img src="https://editions.thediscoverer.com/images/footer-logo.png" alt="The Discoverer" width="165" height="22" border="0" style="display:block;" /></a></td>
                </tr>
                <tr>
                  <td align="center" valign="top" style="font-family:'Playfair Display', Times New Roman, serif; font-size:15px; mso-line-height-rule:exactly; line-height:27px; color:#636363; padding:0 20px 19px 20px;">
                    <em><a href="https://www.thediscoverer.com/?utm_source=Edition%2032&utm_medium=email" target="_blank" style="color:#292929; text-decoration:underline;">Subscribe</a></em><span class="hidden"> &nbsp; &nbsp; </span><span class="break"></span>
                    <em><a href="https://www.thediscoverer.com/?utm_source=Edition%2032&utm_medium=email" target="_blank" style="color:#292929; text-decoration:underline;">TheDiscoverer.com</a></em>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center" valign="top" style="padding:0 0 50px 0;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td class="paddingRight0" align="center" valign="top" style="font-family:'Playfair Display', Times New Roman, serif; font-size:14px; color:#292929; padding:0 10px 0 0;"><a href="https://www.instagram.com/thedscvrr" target="_blank" style="color:#292929; text-decoration:none;"><img src="https://editions.thediscoverer.com/images/footer-icon-instagram.png" alt="instagram icon" width="35" height="35" border="0" style="display:block;" /></a></td>
                              <td class="paddingRight0" align="center" valign="top" style="font-family:'Playfair Display', Times New Roman, serif; font-size:14px; color:#292929; padding:0 10px 0 22px;"><a href="https://www.facebook.com/thedscvrr" target="_blank" style="color:#292929; text-decoration:none;"><img src="https://editions.thediscoverer.com/images/footer-icon-facebook.png" alt="facebook icon" width="35" height="35" border="0" style="display:block;" /></a></td>
                              <td class="paddingRight0" align="center" valign="top" style="font-family:'Playfair Display', Times New Roman, serif; font-size:14px; color:#292929; padding:0 10px 0 22px;"><a href="https://twitter.com/thedscvrr" target="_blank" style="color:#292929; text-decoration:none;"><img src="https://editions.thediscoverer.com/images/footer-icon-twitter.png" alt="twitter icon" width="35" height="35" border="0" style="display:block;"/></a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <!-- Disqus inserted -->
              <div id="disqus_thread"></div>
              <script>
              /**
              *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
              *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      
              var pathname = location.pathname || 'Editions';
              var pullEditionRegex = new RegExp('(?=.*)[0-9]+(?=\/index.html)');
              
              var pageIdentifier = '00';
              if (pathname.match(pullEditionRegex) !== null) {
                pageIdentifier = pathname.match(pullEditionRegex).join()
              }
              var pageUrl = location.href || 'https://editions.thediscoverer.com';
      
              console.log('starting Disqus with ' + pageIdentifier + ' and ' + pageUrl);
      
              var disqus_config = function () {
              this.page.url = pageUrl;  // Replace PAGE_URL with your page's canonical URL variable
              this.page.identifier = pageIdentifier; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
              };
      
              (function() { // DON'T EDIT BELOW THIS LINE
              var d = document, s = d.createElement('script');
              s.src = 'https://thediscoverer-com.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
              })();
              </script>
              <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
        `,
      ),
    )
    .pipe(gulp.dest("./"));
});

gulp.task("insert", () => {
  gulp
    .src("./replace/**/*.html", { base: "./" })
    .pipe(
      replace(
        /.*(<\/xml><\!\[endif\]-->\n).*(<\/head>)/gi,
        `
          <!-- Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-101892464-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'UA-101892464-1');
          </script>
        </head>
        `,
      ),
    )
    .pipe(
      replace(
        /.*(<!-- discoveries -->)/gi,
        `       <!-- Adsense (Inserted) -->
                <tr>
                  <td align="center" valign="top" style="overflow: hidden; padding: 0 0 26px 0;">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins class="adsbygoogle"
                      style="display:block; width: 100%; min-width: 320px; max-width: 640px; height: 100px;"
                      data-ad-client="ca-pub-9724963759311479"
                      data-ad-slot="8999781416"
                      data-ad-format="auto"></ins>
                    <script>
                      (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                  </td>
                </tr>
                <!-- discoveries (Ad inserted above) -->
        `,
      ),
    )
    .pipe(
      replace(
        /.*(<!-- eat this -->)/gi,
        `       <!-- Adsense (Inserted) -->
                <tr>
                  <td align="center" valign="top" style="overflow: hidden; padding: 0 0 26px 0;">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins class="adsbygoogle"
                      style="display:block; width: 100%; min-width: 320px; max-width: 640px; height: 100px;"
                      data-ad-client="ca-pub-9724963759311479"
                      data-ad-slot="5236396264"
                      data-ad-format="auto"></ins>
                    <script>
                      (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                  </td>
                </tr>
                <!-- discoveries (Ad inserted above) -->
        `,
      ),
    )
    .pipe(
      replace(
        /.*(<!-- discoverers of location -->)/gi,
        `       <!-- Adsense (Inserted) -->
                <tr>
                  <td align="center" valign="top" style="overflow: hidden; padding: 0 0 26px 0;">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins class="adsbygoogle"
                      style="display:block; width: 100%; min-width: 320px; max-width: 640px; height: 100px;"
                      data-ad-client="ca-pub-9724963759311479"
                      data-ad-slot="7116454144"
                      data-ad-format="auto"></ins>
                    <script>
                      (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                  </td>
                </tr>
                <!-- discoverers of location (Ad inserted above) -->
        `,
      ),
    )
    // .pipe(
    //   replace(
    //     /.*(<\/body>)/gi,
    //     `
    //     <!-- Disqus inserted -->
    //     <div id="disqus_thread"></div>
    //     <script>
    //     /**
    //     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    //     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

    //     var pathname = location.pathname || 'Editions';
    //     var pullEditionRegex = new RegExp('(?=.*)[0-9]+(?=\/index.html)');

    //     var pageIdentifier = '00';
    //     if (pathname.match(pullEditionRegex) !== null) {
    //       pageIdentifier = pathname.match(pullEditionRegex).join()
    //     }
    //     var pageUrl = 'thediscoverer.com';

    //     console.log('starting Disqus with ' + pageIdentifier + ' and ' + pageUrl);

    //     var disqus_config = function () {
    //     this.page.url = pageUrl;  // Replace PAGE_URL with your page's canonical URL variable
    //     this.page.identifier = pageIdentifier; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    //     };

    //     (function() { // DON'T EDIT BELOW THIS LINE
    //     var d = document, s = d.createElement('script');
    //     s.src = 'https://thediscoverer-com.disqus.com/embed.js';
    //     s.setAttribute('data-timestamp', +new Date());
    //     (d.head || d.body).appendChild(s);
    //     })();
    //     </script>
    //     <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

    //     </body>
    //     `,
    //   ),
    // )
    .pipe(gulp.dest("./"));
});

// gulp.task("del", () => {
//   gulp.src("./replace/**/*.DS_Store").pipe(gulp.dest(del()));
// });
