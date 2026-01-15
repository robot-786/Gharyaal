# Watch Carousel Hero - Setup Guide

## ✨ What You Have Now

Your homepage now features a **stunning watch carousel hero section** with:

- **Golden spotlight effect** on the center watch (animated pulse glow)
- **Side watches** darkened/shadowed for dramatic effect  
- **Smooth carousel transitions** (cubic-bezier easing)
- **Left/Right gold navigation buttons** (circular with hover effects)
- **Auto-rotation** (5 seconds, pauses on hover)
- **Touch/swipe support** for mobile
- **Fully responsive** (3 watches on desktop, 1 on mobile)
- **Keyboard navigation** (arrow keys work!)

## 📸 How to Add Your Watch Images

### Option 1: Local Dev with Theme Customizer (Recommended)

```bash
# Start your local dev server
shopify theme dev
```

Then:
1. Open the local URL (usually http://127.0.0.1:9292)
2. Click **"Customize"** button in the preview bar
3. Navigate to your **Homepage**
4. Find the **"Watch Carousel Hero"** section at the top
5. Click on each watch slide block to upload images
6. Images upload to your Shopify store but changes stay local until you push

**Note:** The local dev server connects to your Shopify store, so uploaded images are stored there, but template changes only apply locally until you run `shopify theme push`.

### Option 2: Add Test Images Directly (For Local Testing Only)

If you want to test with images without uploading to Shopify:

1. **Add watch images to assets folder:**
   ```
   assets/
     watch-1-rolex.png
     watch-2-patek.png
     watch-3-ap.png
     watch-4-omega.png
     watch-5-tag.png
   ```

2. **Temporarily hardcode images in the section:**
   
   Edit `sections/watch-carousel-hero.liquid` around line 10, replace the image block:
   ```liquid
   {% if block.settings.image != blank %}
     <div class="watch-image-wrapper">
       <img src="{{ block.settings.image | image_url: width: 800 }}" ... />
     </div>
   {% else %}
     <!-- TEMPORARY: For local testing -->
     <div class="watch-image-wrapper">
       <img src="{{ 'watch-{{ forloop.index }}.png' | asset_url }}" 
            alt="Watch {{ forloop.index }}" 
            width="800" height="800" />
     </div>
   {% endif %}
   ```

3. **Save and refresh your local dev server** - images will appear

4. **IMPORTANT:** Remove hardcoded images before pushing to production!

### Image Requirements (Both Options):
- **Format**: PNG with transparent background (recommended) or JPG
- **Size**: 800x800px to 1200x1200px (minimum 800px)
- **Aspect Ratio**: Square (1:1) works best
- **Quality**: High resolution for sharp display
- **Background**: Transparent PNG for best spotlight effect
- **File Size**: Optimize to under 200KB each using TinyPNG

**Recommended Watch Positions:**
- **Slide 1**: Rolex Submariner (black/steel)
- **Slide 2**: Patek Philippe Nautilus (rose gold) ← **Center spotlight default**
- **Slide 3**: Audemars Piguet Royal Oak (steel)
- **Slide 4**: Omega Speedmaster (black)
- **Slide 5**: Tag Heuer Carrera (silver)

---

## ⚙️ Customize Text & Settings

**Main Settings:**
- **Section Height**: 700px (adjust 400-1000px)
- **Background Color**: #000000 (black)
- **Enable Autoplay**: ✅ Checked
- **Autoplay Speed**: 5 seconds

**Content:**
- **Heading**: "The Ultimate Luxury Timepieces"
- **Heading Color**: #ffffff (white)
- **Subheading**: "Discover Exquisite Collections"
- **Subheading Color**: #d4af37 (gold)

**Button:**
- **Button Text**: "Shop Now"
- **Button Link**: /collections/all
- **Button Background**: #d4af37 (gold)
- **Button Text Color**: #000000 (black)

## 🎨 Visual Effect Breakdown

### Desktop View (>768px)
```
[Left Watch]     [CENTER WATCH]     [Right Watch]
  (darkened)    (GOLD SPOTLIGHT)     (darkened)
    0.75x            1.1x scale          0.75x
   opacity           GLOWING            opacity
    0.4              1.0                 0.4
```

### Mobile View (<768px)
```
       [CENTER WATCH ONLY]
         (GOLD SPOTLIGHT)
           1.0x scale
```

## 🔧 Advanced Customization

### Change Spotlight Color
Edit `sections/watch-carousel-hero.liquid` line ~260:
```css
background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, ...);
                                    /* ↑ Change RGB values for different glow color */
```

### Adjust Transition Speed
Edit `sections/watch-carousel-hero.liquid` line ~231:
```css
transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            /* ↑ Change 0.6s to 0.8s for slower, 0.4s for faster */
```

### Modify Side Watch Positioning
Edit `sections/watch-carousel-hero.liquid` line ~270:
```css
.watch-slide.prev {
  transform: translate(-150%, -50%) scale(0.75);
                      /* ↑ -150% = left position, change to -120% to move closer */
}

.watch-slide.next {
  transform: translate(50%, -50%) scale(0.75);
                      /* ↑ 50% = right position, change to 80% to move further */
}
```

## 📱 Testing Checklist

- [ ] Upload 3-5 watch images
- [ ] Test carousel navigation (left/right arrows)
- [ ] Verify autoplay works (watches rotate every 5 seconds)
- [ ] Check mobile responsiveness (resize browser)
- [ ] Test touch/swipe on mobile device
- [ ] Verify gold spotlight effect appears
- [ ] Check that side watches are darkened
- [ ] Test "Shop Now" button link
- [ ] Verify smooth transitions between slides

## 🚀 Going Live

When ready to publish:
```bash
# Push to your live theme
shopify theme push

# Or push to development theme
shopify theme push --development
```

## 💡 Pro Tips

1. **Use transparent PNG images** for watches - the spotlight effect looks much better
2. **Consistent watch sizes** - crop all images to same dimensions before uploading
3. **High quality images** - customers zoom in on watches, use 1200px+ images
4. **Product photography angles** - slight 3/4 view works better than flat top-down
5. **Test on real mobile devices** - not just browser resize
6. **Optimize image file sizes** - use tools like TinyPNG before uploading

## 🎯 Match Reference Image

Your carousel now matches the reference image you provided:
- ✅ Black background with gradient
- ✅ Center watch with golden glow/spotlight
- ✅ Side watches visible but darkened
- ✅ Smooth professional animations
- ✅ Gold navigation buttons
- ✅ Luxury typography and styling
- ✅ "The Ultimate Luxury Timepieces" heading
- ✅ "Discover Exquisite Collections" subheading
- ✅ Gold "Shop Now" button

## 🛠️ Troubleshooting

**Issue: Carousel not animating**
- Check browser console for JavaScript errors
- Ensure you have multiple watch slides added (minimum 2)

**Issue: Spotlight effect not showing**
- Verify custom CSS file is loaded ([custom-gharyaal.css](assets/custom-gharyaal.css))
- Check browser doesn't have hardware acceleration disabled

**Issue: Images look pixelated**
- Upload higher resolution images (1200x1200px minimum)
- Use PNG format instead of JPG

**Issue: Mobile layout broken**
- Clear browser cache
- Test in incognito/private mode
- Check mobile viewport settings

---

**Need Help?** Check the section file at: [sections/watch-carousel-hero.liquid](sections/watch-carousel-hero.liquid)

**CSS Enhancements:** [assets/custom-gharyaal.css](assets/custom-gharyaal.css) (lines 468-554)
