library(DESeq2); library(ggplot2); library(pheatmap); library(ggrepel)

    # 1. Load Data & Run DESeq2
    counts <- read.table("count_matrix.txt", header=T, row.names=1,
  sep="\t")
    sample_info <- data.frame(condition = factor(rep(c("Healthy", "SALS"), c(8, 10)),
  levels=c("Healthy", "SALS")), row.names = colnames(counts))
    dds <- DESeq(DESeqDataSetFromMatrix(counts, sample_info, ~condition))
    res_df <- as.data.frame(results(dds, contrast=c("condition", "SALS", "Healthy")))
    res_df <- na.omit(cbind(Gene=rownames(res_df), res_df))
    res_df$Sig <- ifelse(res_df$padj < 0.05 & res_df$log2FoldChange > 1, "Up",
  ifelse(res_df$padj < 0.05 & res_df$log2FoldChange < -1, "Down", "Not Sig"))

    # 2. Volcano Plot
    ggplot(res_df, aes(log2FoldChange, -log10(padj), color=Sig)) + geom_point(alpha=0.8) +
      scale_color_manual(values=c("Down"="blue", "Not Sig"="grey", "Up"="red")) +
  theme_minimal() +
      geom_text_repel(data=subset(res_df, Sig != "Not Sig"), aes(label=Gene), size=3,
  show.legend=F)
    ggsave("Volcano_Plot.png", width=8, height=6)

    # 3. PCA Plot
    vsd <- vst(dds, blind=FALSE)
    ggsave("/Users/sulky/Downloads/PCA_Plot.png", plotPCA(vsd, intgroup="condition") +
  theme_minimal(), width=7, height=5)

    # 4. Heatmap
    sig_genes <- subset(res_df, Sig != "Not Sig")$Gene
    if(length(sig_genes) > 0) {
      pheatmap(assay(vsd)[sig_genes, ], scale="row", annotation_col=sample_info,
  show_colnames=F,
               filename="Heatmap_DEGs.png", width=8, height=6)
    }
    cat("Plots generated successfully in Downloads folder.\n")
