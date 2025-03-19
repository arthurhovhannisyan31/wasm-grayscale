use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) {
  log(&"hello from Rust".into());
  log(&encoded_file.into());
}

// #[cfg(test)]
// mod tests {
//   #[test]
//   fn it_works() {}
// }
